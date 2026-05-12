# estate-ready
# Tier 1 — Enterprise Grade | OCTech Services

## 1. Project Purpose
EstateReady is an estate planning intake and triage tool. Users pay a small fee,
complete a structured intake questionnaire, and receive a professional scoring and
recommendation packet they can take to an estate attorney or planning partner.
Commercial intent: pay-per-report revenue model.

**Tier:** 1 — Enterprise Grade
**Status:** Active

## 2. Architecture Overview
**Stack:** Next.js (App Router) · TypeScript · Tailwind · Supabase (Postgres) · Stripe · Vercel
**Key Components:** Intake questionnaire (37Q · 7 domains) · Scoring engine (0–100 · 4 tiers) · Report generator · Payment gate
**External Integrations:** Stripe (payments + webhooks · $21/report) · Supabase (database + RLS) · Resend (magic link delivery · 1-year token) · Claude API (report narrative generation)
**Pricing:** $21 per report · pay-per-report · no subscription

## 3. Working Rules
- Small, reviewable changes only
- Never modify production data directly
- Check existing patterns before creating new ones
- Ask before adding new dependencies
- Keep this CLAUDE.md under 200 lines — only include what Claude couldn't know on its own
- Never edit more than 3 files at once without presenting a plan first
- If a task requires more than 5 steps, write a plan and get approval before starting
- Delegate mechanical tasks to gpt-4o-mini via `bash scripts/delegate.sh` to conserve Claude tokens

**Token delegation — delegate to gpt-4o-mini:**
- Summarizing files, logs, or large text blocks
- Reformatting or renaming content
- Generating boilerplate (config files, basic structure)
- Listing, diffing, or describing content

**Keep with Claude:**
- Architecture and design decisions
- Debugging complex issues
- Security review and anything touching CLAUDE.md or RAID.md

## 4. Commands
```bash
npm run dev       # local dev server
npm run build     # production build
npm run lint      # ESLint
```

## 5. Code Standards
- No hardcoded secrets or API keys
- Explicit error handling always
- Follow existing naming conventions

## 6. Security / Data Handling

### Credentials & Secrets
- All credentials via environment variables — never hardcoded, never committed
- `.env` files must be in `.gitignore` before first commit
- Never commit service account files, `.secret.local`, or key files
- Stripe secret keys, webhook secrets, and admin tokens are server-side only

### Trust Boundaries
- Auth logic lives on the server — never implement authentication or signing logic client-side
- Cryptographic keys (HMAC, JWT secrets) must never appear in frontend code
- The backend must independently verify every request — never trust client-supplied roles or permissions
- Privilege levels must be enforced server-side; client UI state is not a security control

### Database & Access Controls
- Apply least-privilege — no table or bucket should be more permissive than it needs to be
- For Supabase: Row Level Security (RLS) must be enabled on every table holding user data
- Public and private storage buckets must be explicitly separated — never bundle them
- Review and resolve all security warnings from the database provider before shipping

### API & Middleware
- Every API route must have explicit auth unless deliberately public — no implicit open routes
- Validate and sanitize all external inputs at the boundary
- Rate limiting and fault isolation required on any route exposed to the public
- Never log sensitive user data (PII, tokens, passwords, health data)

### Architecture
- Core services must have fault boundaries — a single service failure should not take down the stack
- Avoid tightly coupled architecture where one broken component causes full system outage
- External integrations are a risk surface — treat every third-party call as potentially failing

## 7. Definition of Done
- [ ] Works as intended
- [ ] No lint errors
- [ ] No secrets exposed
- [ ] Security checklist passed (see Section 6)
- [ ] Change is small and reasonably sized
- [ ] Existing patterns respected
- [ ] If public-facing site: AEO patterns applied (llms.txt at domain root, AI crawlers allowed in robots.txt, Quick Answer block on key pages, question-format H2s, FAQ schema where relevant)

## 8. Tooling Guidance
- Playwright: [x] Not approved
- Skills: claude-api, simplify
- Agents: reviewer, pm-analyst
- Hooks: pre-commit (git), session-end (Claude Code)

### MCP / Browser Tools
**Status:** [x] Not required
**Approved MCP servers:** (none)

## 9. Session Protocol

**Session open** — paste this before starting work:
```
Read CLAUDE.md, RAID.md, and .claude/prompts/master-prompt.md
before we begin. Confirm your understanding of the project
and state which delivery phase we are in.
```

**During the session:**
1. Work in small, reviewable increments
2. Flag risks and blockers in RAID.md as they surface
3. Run `/security-review` before any PR or deployment

**Session close** — before signing off:
```
Read CLAUDE.md, RAID.md, and .claude/prompts/master-prompt.md
and confirm all three are accurate before we sign off.
```

## 10. Open Items
- [x] Define data model: Submission, QuestionnaireResponse, Report — no auth, email-only
- [x] Design payment gate flow: Stripe Checkout → webhook → report unlock via magic link (Resend, 1-year token)
- [x] Draft intake questionnaire: 37 questions · 7 domains · 4-tier scoring model
- [x] Scaffold Next.js project with Vercel deployment
- [x] Implement questionnaire flow (domain-by-domain, progress indicator, domain transitions)
- [x] Implement scoring engine
- [x] Integrate Stripe Checkout + webhook
- [x] Integrate Claude API for report narrative generation
- [x] Integrate Resend for magic link delivery
- [x] Build report view (tier + recommendations)
- [x] Front page disclaimer: honest, attorney-voice transparency statement (not legal advice)
- [ ] Deploy schema to Supabase
- [ ] Create Stripe product + price ($21)
- [ ] Set all env vars in Vercel
- [ ] Deploy to Vercel + verify end-to-end flow
- [ ] Add favicon (SVG) and OG image
- [ ] Add /privacy and /disclaimer pages
- [ ] Add llms.txt and robots.txt
