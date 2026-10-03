import { spawnSync } from 'node:child_process';
import { requireCondition, requireHostedRunner } from './boundary.mjs';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export function fixtureRegistry(applicants, reviewers) {
  requireCondition(Array.isArray(applicants) && applicants.length === 5
    && Array.isArray(reviewers) && reviewers.length === 2, 'V1_FIXTURE_BUDGET');
  const users = [...applicants.map(a => a.userId), ...reviewers.map(r => r.userId)];
  const applications = applicants.map(a => a.applicationId);
  requireCondition([...users, ...applications].every(id => typeof id === 'string' && uuidPattern.test(id)), 'V1_FIXTURE_UUID');
  requireCondition(new Set(users).size === 7 && new Set(applications).size === 5, 'V1_FIXTURE_DISTINCT');
  return Object.freeze({ applicants: applicants.map(({ userId, applicationId }) => Object.freeze({ userId, applicationId })),
    reviewers: reviewers.map(({ userId }) => Object.freeze({ userId })) });
}

// Only registered UUID values enter these fixed statements. No arbitrary SQL,
// shell, URL, table or target is accepted by the returned fixture capability.
export function createFixtureAuthority(applicants, reviewers) {
  const registry = fixtureRegistry(applicants, reviewers);
  let promoted = false;
  let revoked = false;
  function docker(args, input) {
    requireHostedRunner(process.env, process.platform);
    const result = spawnSync('docker', args, { input, encoding: 'utf8', timeout: 20000, maxBuffer: 1024 * 1024 });
    requireCondition(!result.error && result.status === 0, 'V1_FIXTURE_PROCESS');
    return result.stdout;
  }
  function owned() {
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
        where user_id in (:'r1'::uuid,:'r2'::uuid) and role='participant' returning user_id
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
        'teachers',(select coalesce(json_agg(t order by t.id),'[]'::json) from public.teachers t where user_id=:'owner'::uuid),
        'verifications',(select coalesce(json_agg(v order by v.teacher_id),'[]'::json) from app_private.teacher_verifications v where application_id=:'app'::uuid),
        'decisions',(select coalesce(json_agg(d),'[]'::json) from public.teacher_application_decisions d where application_id=:'app'::uuid),
        'reviews',(select coalesce(json_agg(r),'[]'::json) from app_private.teacher_application_reviews r where application_id=:'app'::uuid),
        'audit',(select coalesce(json_agg(l order by l.created_at,l.id),'[]'::json) from app_private.admin_audit_log l where target_type='teacher_application' and target_id=:'app'::uuid),
        'documents',(select coalesce(json_agg(d order by d.id),'[]'::json) from public.teacher_documents d where application_id=:'app'::uuid and user_id=:'owner'::uuid)
      );`, { owner: a.userId, app: a.applicationId });
    },
  });
}
