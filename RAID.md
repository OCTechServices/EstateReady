# RAID Log: estate-ready
# Tier 1 — Enterprise Grade | OCTech Services
# Last Updated: 2026-07-18

---

## Risks
| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R01 | Secrets or credentials accidentally committed to git | Low | Critical | .gitignore covers .env files; inspect-projects.sh scans on each governance cycle |
| R02 | Scope creep — features added beyond CLAUDE.md definition | Medium | High | Review CLAUDE.md at every session start; question any task not traceable to Section 1 |
| R03 | External API dependency breaks or changes without notice | Medium | Medium | Pin dependency versions; document all integrations in CLAUDE.md Section 2 |
| R04 | CLAUDE.md becomes stale — Claude operates from outdated context | Medium | High | Update CLAUDE.md at session end whenever anything meaningful changes |

## Assumptions
| ID | Assumption |
|---|---|
| A01 | Stack and integrations documented in CLAUDE.md Section 2 are accurate |
| A02 | Environment variables follow the naming convention in .env.example |
| A03 | One CLAUDE.md per project — located at project root |

## Issues
| ID | Issue | Source | Priority | Status |
|---|---|---|---|---|
| I01 | Anthropic API 529 overloaded errors during report generation | Claude API | Medium | Mitigated — maxRetries set to 5; webhook status reset to 'paid' allows resend |
| I02 | Impact affiliate site verification meta tag in layout + page.tsx | Marketing | Low | Resolved — both tags removed |
| I03 | GitHub auto-deploy was not connected at initial Vercel deploy | DevOps | Low | Resolved — connected via Vercel dashboard |

## Dependencies
| ID | Dependency | Type | Notes |
|---|---|---|---|
| D01 | Stripe | Payment | Live keys active; webhook verified; promo codes enabled |
| D02 | Supabase | Database | RLS enabled on all tables; service role key used server-side only |
| D03 | Resend | Email | Verified domain: opcoretech.com; from: reports@opcoretech.com |
| D04 | Anthropic Claude API | AI | Model: claude-sonnet-4-6; max_tokens: 4096; maxRetries: 5 |
| D05 | Vercel | Hosting | Auto-deploy connected to OCTechServices/EstateReady on main branch; Production domain: willestateready.com |
| D06 | Impact (affiliate) | Marketing | Pending verification; Trust & Will partnership in progress |
