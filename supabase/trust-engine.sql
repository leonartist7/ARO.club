-- ============================================
-- Tonguee Trust & Quality Engine
-- ============================================
-- The keystone: admin role + teacher application/portfolio + verification
-- workflow + the security gate that prevents UNVERIFIED teachers from
-- publishing experiences.
--
-- Run AFTER schema.sql and langgie-extensions.sql in the Supabase SQL Editor.
-- Idempotent where practical (IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================

-- ============================================
-- 1. ROLES (student | teacher | admin)
-- ============================================
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student'
  CHECK (role IN ('student', 'teacher', 'admin'));

-- Helper: is the current user an admin? (SECURITY DEFINER avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================
-- 2. TEACHER APPLICATIONS (the review record)
-- ============================================
CREATE TABLE IF NOT EXISTS teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'in_review', 'changes_requested', 'approved', 'rejected')),
  tier TEXT CHECK (tier IN ('verified', 'pro', 'elite')),

  -- What the applicant submitted
  display_name TEXT,
  headline TEXT,
  bio TEXT,
  languages JSONB DEFAULT '[]',        -- [{code, name, proficiency}]
  experience_types TEXT[] DEFAULT '{}',
  cities TEXT[] DEFAULT '{}',
  teaches_online BOOLEAN DEFAULT FALSE,
  teaches_in_person BOOLEAN DEFAULT TRUE,
  intro_video_url TEXT,
  social_links JSONB DEFAULT '{}',
  background_check_consent BOOLEAN DEFAULT FALSE,
  agreed_to_standards BOOLEAN DEFAULT FALSE,

  -- Admin review fields
  rubric_scores JSONB DEFAULT '{}',    -- {language, professionalism, safety, portfolio, uniqueness}
  admin_notes TEXT,                    -- internal only
  decision_reason TEXT,                -- shared with applicant on reject/changes
  reviewed_by UUID REFERENCES profiles(id),

  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teacher_applications_user ON teacher_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_applications_status ON teacher_applications(status);

-- ============================================
-- 3. TEACHER DOCUMENTS (portfolio + verification artifacts)
-- ============================================
CREATE TABLE IF NOT EXISTS teacher_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES teacher_applications(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doc_type TEXT NOT NULL
    CHECK (doc_type IN ('id', 'certification', 'intro_video', 'portfolio_image', 'sample_lesson')),
  label TEXT,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teacher_documents_application ON teacher_documents(application_id);

-- ============================================
-- 4. EXTEND TEACHERS with tier / status / application link
-- ============================================
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS tier TEXT
  CHECK (tier IN ('verified', 'pro', 'elite'));
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES teacher_applications(id);
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending'
  CHECK (status IN ('pending', 'active', 'suspended', 'banned'));

-- ============================================
-- 5. ADMIN AUDIT LOG (accountability + future delegation)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,                -- e.g. 'approve_application', 'reject_application', 'suspend_teacher'
  target_type TEXT,                    -- 'application' | 'teacher' | 'experience' | 'user'
  target_id UUID,
  detail JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_admin ON admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_target ON admin_audit_log(target_type, target_id);

-- ============================================
-- 6. THE SECURITY GATE — verified teachers only can be public
-- ============================================
-- Replace the permissive "viewable by everyone" policy so the public only
-- sees published experiences from VERIFIED + ACTIVE teachers. Owners always
-- see their own; admins see everything.
DROP POLICY IF EXISTS "Experiences are viewable by everyone" ON experiences;
DROP POLICY IF EXISTS "Public sees only verified-teacher published experiences" ON experiences;

CREATE POLICY "Public sees only verified-teacher published experiences"
  ON experiences FOR SELECT
  USING (
    (
      status = 'published'
      AND teacher_id IN (
        SELECT id FROM teachers WHERE verified = TRUE AND status = 'active'
      )
    )
    OR teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Hard enforcement at write-time: a row may only be 'published' if its teacher
-- is verified + active. Prevents bypassing the gate via direct insert/update.
CREATE OR REPLACE FUNCTION public.enforce_verified_publish()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' THEN
    IF NOT EXISTS (
      SELECT 1 FROM teachers
      WHERE id = NEW.teacher_id AND verified = TRUE AND status = 'active'
    ) THEN
      RAISE EXCEPTION 'Cannot publish experience: teacher is not verified and active';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_verified_publish ON experiences;
CREATE TRIGGER trg_enforce_verified_publish
  BEFORE INSERT OR UPDATE OF status ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_verified_publish();

-- ============================================
-- 7. RLS — applications, documents, audit log, admin overrides
-- ============================================
ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Applications: applicant manages own draft; admin sees/updates all
DROP POLICY IF EXISTS "Applicants view own application" ON teacher_applications;
CREATE POLICY "Applicants view own application"
  ON teacher_applications FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Applicants create own application" ON teacher_applications;
CREATE POLICY "Applicants create own application"
  ON teacher_applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Applicant may edit while still editable; admin may always edit (decisions)
DROP POLICY IF EXISTS "Applicant or admin updates application" ON teacher_applications;
CREATE POLICY "Applicant or admin updates application"
  ON teacher_applications FOR UPDATE
  USING (
    public.is_admin()
    OR (user_id = auth.uid() AND status IN ('draft', 'changes_requested'))
  );

-- Documents: owner manages own; admin reads all
DROP POLICY IF EXISTS "Owner or admin views documents" ON teacher_documents;
CREATE POLICY "Owner or admin views documents"
  ON teacher_documents FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Owner inserts documents" ON teacher_documents;
CREATE POLICY "Owner inserts documents"
  ON teacher_documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Owner or admin deletes documents" ON teacher_documents;
CREATE POLICY "Owner or admin deletes documents"
  ON teacher_documents FOR DELETE
  USING (user_id = auth.uid() OR public.is_admin());

-- Audit log: admin only
DROP POLICY IF EXISTS "Admins view audit log" ON admin_audit_log;
CREATE POLICY "Admins view audit log"
  ON admin_audit_log FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins write audit log" ON admin_audit_log;
CREATE POLICY "Admins write audit log"
  ON admin_audit_log FOR INSERT
  WITH CHECK (public.is_admin());

-- Admin override: let admins manage teachers (verify / suspend / tier)
DROP POLICY IF EXISTS "Admins manage teachers" ON teachers;
CREATE POLICY "Admins manage teachers"
  ON teachers FOR UPDATE
  USING (public.is_admin());

-- Admin override: let admins read every profile (for user management)
DROP POLICY IF EXISTS "Admins view all profiles" ON profiles;
CREATE POLICY "Admins view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin() OR TRUE); -- profiles already public-readable; kept explicit

-- ============================================
-- 8. updated_at trigger for applications
-- ============================================
DROP TRIGGER IF EXISTS update_teacher_applications_updated_at ON teacher_applications;
CREATE TRIGGER update_teacher_applications_updated_at
  BEFORE UPDATE ON teacher_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 9. STORAGE BUCKETS (private; admin-readable via policies in dashboard)
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('verification-docs', 'verification-docs', FALSE),
  ('teacher-portfolio', 'teacher-portfolio', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Owners can upload to their own folder (path convention: {user_id}/...)
DROP POLICY IF EXISTS "Owner uploads portfolio" ON storage.objects;
CREATE POLICY "Owner uploads portfolio"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('verification-docs', 'teacher-portfolio')
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Owner or admin reads portfolio" ON storage.objects;
CREATE POLICY "Owner or admin reads portfolio"
  ON storage.objects FOR SELECT
  USING (
    bucket_id IN ('verification-docs', 'teacher-portfolio')
    AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_admin())
  );

-- ============================================
-- 10. ADMIN BOOTSTRAP (run once, replace the email)
-- ============================================
-- UPDATE profiles SET role = 'admin'
-- WHERE email = 'leonartist.cs@gmail.com';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Tonguee Trust & Quality Engine installed.';
  RAISE NOTICE '🔐 Roles: student | teacher | admin';
  RAISE NOTICE '📋 Added: teacher_applications, teacher_documents, admin_audit_log';
  RAISE NOTICE '🛡️  Gate: only VERIFIED + ACTIVE teachers can publish experiences';
  RAISE NOTICE '🗂️  Storage: verification-docs, teacher-portfolio (private)';
  RAISE NOTICE '👉 Final step: set your account role to admin (see section 10).';
END $$;
