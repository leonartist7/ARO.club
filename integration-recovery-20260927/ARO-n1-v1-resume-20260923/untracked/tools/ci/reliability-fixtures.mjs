import { spawnSync } from 'node:child_process';
import { requireCondition, requireHostedRunner } from './boundary.mjs';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export function fixtureRegistry(applicants, reviewers) {
  requireCondition(Array.isArray(applicants) && applicants.length === 5
    && Array.isArray(reviewers) && reviewers.length === 2, 'V1_FIXTURE_BUDGET');
  const users = [...applicants.map(a => a.userId), ...reviewers.map(r => r.userId)];
  const applications = applicants.map(a => a.applicationId);
  requireCondition([...users, ...applications].every(id => typeof id === 'string' && uuid.test(id)), 'V1_FIXTURE_UUID');
  requireCondition(new Set(users).size === 7 && new Set(applications).size === 5, 'V1_FIXTURE_DISTINCT');
  return Object.freeze({
    applicants: Object.freeze(applicants.map(({ userId, applicationId }) => Object.freeze({ userId, applicationId }))),
    reviewers: Object.freeze(reviewers.map(({ userId }) => Object.freeze({ userId }))),
  });
}

export function validateAttemptPath(registry, path) {
  const a = registry.applicants[4];
  requireCondition(typeof path === 'string' && path.startsWith(`${a.userId}/${a.applicationId}/`)
    && /^certification-[0-9]+\.pdf$/.test(path.split('/')[2]) && path.split('/').length === 3, 'V1_ATTEMPT_PATH');
  return path;
}

// Local fixed capabilities only. SQL and Docker arguments never come from a
// caller. Raw observations stay in memory; the report uses a separate allowlist.
export function createFixtureAuthority(applicants, reviewers) {
  const registry = fixtureRegistry(applicants, reviewers);
  let promoted = false;
  let revoked = false;
  let attemptedPath;
  function docker(args, input) {
    requireHostedRunner(process.env, process.platform);
    const result = spawnSync('docker', args, { input, encoding: 'utf8', timeout: 20000, maxBuffer: 1024 * 1024 });
    requireCondition(!result.error && result.status === 0, 'V1_FIXTURE_PROCESS');
    return result.stdout;
  }
  function owned() {
    requireHostedRunner(process.env, process.platform);
    requireCondition(/^\d+$/.test(process.env.GITHUB_RUN_ID ?? '') && /^\d+$/.test(process.env.GITHUB_RUN_ATTEMPT ?? '')
      && /^[A-Za-z0-9_-]+$/.test(process.env.GITHUB_JOB ?? ''), 'V1_FIXTURE_OWNER');
    const [network] = JSON.parse(docker(['network', 'inspect', 'aro-i0-ci-net']));
    const owner = `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}-${process.env.GITHUB_JOB}`;
    requireCondition(network.Labels?.['aro.i0.owner'] === owner, 'V1_FIXTURE_NOT_OWNED');
    const [database] = JSON.parse(docker(['inspect', 'supabase_db_aro-i0-ci']));
    requireCondition(database.State.Running && database.NetworkSettings.Networks['aro-i0-ci-net']?.NetworkID === network.Id,
      'V1_FIXTURE_DATABASE_TARGET');
  }
  function query(statement, variables = {}) {
    owned();
    const args = ['exec', '-i', 'supabase_db_aro-i0-ci', 'psql', '-X', '-qAt', '-U', 'postgres', '-d', 'postgres', '-v', 'ON_ERROR_STOP=1'];
    for (const [name, value] of Object.entries(variables)) args.push('-v', `${name}=${value}`);
    return JSON.parse(docker(args, statement).trim());
  }
  function application(index) {
    requireCondition(Number.isInteger(index) && index >= 0 && index < 5, 'V1_APPLICATION_LABEL');
    return registry.applicants[index];
  }
  return Object.freeze({
    promoteReviewers() {
      requireCondition(!promoted, 'V1_PROMOTION_REPEATED');
      const changed = query(`with changed as (
        update app_private.user_roles set role='admin',updated_at=statement_timestamp()
        where user_id in (:'r1'::uuid,:'r2'::uuid) and role='participant'
        and (select count(*) from app_private.user_roles where user_id in (:'r1'::uuid,:'r2'::uuid) and role='participant')=2
        returning user_id
      ) select count(*) from changed;`, { r1: registry.reviewers[0].userId, r2: registry.reviewers[1].userId });
      requireCondition(changed === 2, 'V1_PROMOTION_COUNT');
      promoted = true;
    },
    revokeReviewer() {
      requireCondition(promoted && !revoked, 'V1_REVOCATION_ORDER');
      const changed = query(`with changed as (
        update app_private.user_roles set role='participant',updated_at=statement_timestamp()
        where user_id=:'r2'::uuid and role='admin' returning user_id
      ) select count(*) from changed;`, { r2: registry.reviewers[1].userId });
      requireCondition(changed === 1, 'V1_REVOCATION_COUNT');
      revoked = true;
    },
    snapshot(index) {
      const a = application(index);
      return query(`select json_build_object(
        'applications',(select count(*) from public.teacher_applications where user_id=:'owner'::uuid),
        'application',(select json_build_object('status',status,'submitted_at',submitted_at,'bio',bio) from public.teacher_applications where id=:'app'::uuid and user_id=:'owner'::uuid),
        'role',(select role from app_private.user_roles where user_id=:'owner'::uuid),
        'teachers',(select coalesce(json_agg(t),'[]'::json) from (select id,user_id,name,photo,languages,specialties,bio,tagline,rating,total_reviews,total_sessions,years_teaching,created_at,updated_at from public.teachers where user_id=:'owner'::uuid order by id) t),
        'verifications',(select coalesce(json_agg(v),'[]'::json) from (select teacher_id,application_id,verified,status,tier,verification_date,updated_at from app_private.teacher_verifications where application_id=:'app'::uuid order by teacher_id) v),
        'decisions',(select coalesce(json_agg(d),'[]'::json) from (select application_id,tier,decision_reason,reviewed_at,updated_at from public.teacher_application_decisions where application_id=:'app'::uuid) d),
        'reviews',(select coalesce(json_agg(r),'[]'::json) from (select application_id,tier,rubric_scores,admin_notes,decision_reason,reviewed_by,reviewed_at,updated_at from app_private.teacher_application_reviews where application_id=:'app'::uuid) r),
        'audit',(select coalesce(json_agg(l),'[]'::json) from (select id,admin_id,action,target_type,target_id,detail,created_at from app_private.admin_audit_log where target_type='teacher_application' and target_id=:'app'::uuid order by created_at,id) l),
        'documents',(select coalesce(json_agg(d),'[]'::json) from (select id,application_id,user_id,doc_type,object_path from public.teacher_documents where application_id=:'app'::uuid and user_id=:'owner'::uuid order by id) d)
      );`, { owner: a.userId, app: a.applicationId });
    },
    registerAttempt(path) {
      requireCondition(attemptedPath === undefined, 'V1_UPLOAD_ATTEMPT_BUDGET');
      attemptedPath = validateAttemptPath(registry, path);
    },
    attemptedObject() {
      requireCondition(attemptedPath !== undefined, 'V1_UPLOAD_ATTEMPT_MISSING');
      return query(`select json_build_object(
        'objects',(select count(*) from storage.objects where bucket_id='teacher-portfolio' and name=:'path'),
        'metadata',(select count(*) from public.teacher_documents where application_id=:'app'::uuid and user_id=:'owner'::uuid and object_path=:'path')
      );`, { path: attemptedPath, app: registry.applicants[4].applicationId, owner: registry.applicants[4].userId });
    },
  });
}
