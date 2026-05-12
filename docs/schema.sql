-- EstateReady Database Schema
-- Run in Supabase SQL Editor
-- All tables have RLS enabled — no table is publicly writable

-- ============================================================
-- submissions
-- ============================================================
create table submissions (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  stripe_session_id text unique,
  access_token      uuid unique default gen_random_uuid(),
  access_token_expires_at timestamptz not null default (now() + interval '1 year'),
  status            text not null default 'pending_payment'
                    check (status in ('pending_payment', 'paid', 'processing', 'complete')),
  created_at        timestamptz not null default now(),
  paid_at           timestamptz
);

alter table submissions enable row level security;

-- No public read/write — all access via service role (server-side only)
-- Token-based report access is handled in API routes, not RLS

-- ============================================================
-- questionnaire_responses
-- ============================================================
create table questionnaire_responses (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  answers       jsonb not null default '{}',
  completed_at  timestamptz
);

alter table questionnaire_responses enable row level security;

-- ============================================================
-- reports
-- ============================================================
create table reports (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  score         integer not null check (score >= 0 and score <= 100),
  tier          integer not null check (tier in (1, 2, 3, 4)),
  recommendations jsonb not null default '{}',
  generated_at  timestamptz not null default now(),
  pdf_url       text
);

alter table reports enable row level security;

-- ============================================================
-- indexes
-- ============================================================
create index idx_submissions_email on submissions(email);
create index idx_submissions_access_token on submissions(access_token);
create index idx_submissions_stripe_session on submissions(stripe_session_id);
create index idx_reports_submission_id on reports(submission_id);
create index idx_questionnaire_responses_submission_id on questionnaire_responses(submission_id);
