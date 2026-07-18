import { BlogArticle } from '@/lib/blog'

export const article: BlogArticle = {
  slug: 'what-happens-if-you-die-without-a-will',
  title: 'What Happens If You Die Without a Will?',
  description:
    'Dying without a will means the state decides what happens to your home, your savings, and who raises your children. Here is what intestate succession actually looks like — and what it costs your family.',
  publishedAt: '2026-07-18',
  readTime: '6 min read',
  content: `
<div class="quick-answer">
  <p class="quick-answer-label">Quick Answer</p>
  <p>If you die without a will, your state's intestate succession laws determine who inherits your assets — not you. Your spouse may not get everything. Your unmarried partner gets nothing. A court appoints a guardian for your children. The process typically takes 12–18 months and costs thousands in legal fees before your family sees a dollar.</p>
</div>

<p>About 3 in 4 American adults have no will, trust, or estate plan of any kind. Most assume their spouse will automatically inherit everything, that a close family friend could raise their children, or that the government will simply "figure it out." None of those things are guaranteed — or even likely — without a valid estate plan.</p>

<p>Here is what actually happens when someone dies intestate (the legal term for dying without a will).</p>

<h2>What does "dying intestate" mean?</h2>

<p>Intestate means without a valid will. Every U.S. state has intestate succession laws — a default inheritance rulebook that kicks in when you leave no instructions. These laws were written to be broadly fair, not to reflect your specific situation, your relationships, or your wishes.</p>

<p>The court follows the statute. Your preferences — if unwritten — do not factor in.</p>

<h2>Who inherits your assets when there is no will?</h2>

<p>Intestate succession distributes assets to your closest legal relatives in a defined order. The exact rules vary by state, but the general hierarchy looks like this:</p>

<ul>
  <li><strong>Married with children:</strong> In many states, your spouse and children split the estate — not your spouse alone. Your spouse may receive one-third to one-half; the rest goes to your children, including minor children whose shares are held in court-supervised accounts until they turn 18.</li>
  <li><strong>Married, no children:</strong> Your spouse likely inherits everything, though some states include your parents or siblings as partial heirs.</li>
  <li><strong>Unmarried with children:</strong> Your children inherit everything in equal shares.</li>
  <li><strong>Single with no children:</strong> Assets pass to your parents, then siblings, then more distant relatives.</li>
</ul>

<p><strong>Notable gaps:</strong> Unmarried partners receive nothing under intestate succession, regardless of how long you have been together. Stepchildren you never legally adopted are typically excluded. Friends, charities, and anyone you intended to benefit but did not legally designate receive nothing.</p>

<h2>Who decides who raises your children?</h2>

<p>This is the question that motivates most people to finally create an estate plan — and the answer is stark.</p>

<p>Without a will, a probate court decides who raises your minor children. The judge considers the best interests of the child, but your wishes — if unwritten — carry no legal weight. Your preferred guardian may not be appointed. A relative you would never have chosen might petition successfully. The process is slow, adversarial, and public.</p>

<p>A will is the only document that lets you formally name a guardian. If you have minor children and no will, this is your most urgent planning gap.</p>

<h2>What happens to your house?</h2>

<p>Your home is part of your probate estate if it is titled in your name alone. That means:</p>

<ul>
  <li>The house cannot be sold or transferred until the court approves it</li>
  <li>Your heirs may inherit fractional shares — your spouse and children each owning a percentage — creating co-ownership disputes</li>
  <li>If heirs disagree on what to do with the property, a court may order a partition sale, forcing a sale at potentially below-market value</li>
</ul>

<p>Real estate held in joint tenancy with right of survivorship or in a living trust passes outside of probate entirely. Without those structures, your home goes through the court process.</p>

<h2>How long does the process take — and what does it cost?</h2>

<p>Probate without a will takes longer than probate with one. A contested or complex intestate estate can take two to four years. Even straightforward cases average 12–18 months. During that time, your family may not have access to estate assets to pay bills, mortgages, or ongoing expenses.</p>

<p>Attorney fees, court costs, executor fees, and appraisals typically consume 3–7% of the gross estate value. On a $500,000 estate, that is $15,000–$35,000 that goes to the process instead of your family.</p>

<h2>What a will does not cover</h2>

<p>Even with a valid will, some assets pass by contract or beneficiary designation — not through the will. These include life insurance proceeds, retirement accounts (401k, IRA), bank accounts with a payable-on-death designation, and assets held in trust.</p>

<p>If those designations are outdated — naming an ex-spouse, a deceased parent, or no one at all — the asset may end up in the wrong hands or in probate regardless of what your will says. Reviewing beneficiary designations is as important as having a will.</p>

<h2>Is a will enough?</h2>

<p>A will is the foundation. But depending on your situation — the size of your estate, whether you have minor children, business interests, or a blended family — you may also need a revocable living trust, durable power of attorney, healthcare directive, and updated beneficiary designations across all accounts.</p>

<p>The right starting point is understanding what you actually have, what is already in place, and where the gaps are. That is exactly what a readiness assessment is designed to surface.</p>

<div class="blog-cta">
  <p class="blog-cta-label">Not sure where you stand?</p>
  <p class="blog-cta-body">The Will &amp; Estate Ready assessment covers all 7 areas of estate planning — wills, trusts, powers of attorney, healthcare directives, beneficiary designations, insurance, and tax awareness — and delivers a personalized readiness report in about 10 minutes.</p>
  <a href="/intake" class="blog-cta-link">Start My Assessment — $21 →</a>
</div>
`,
  faq: [
    {
      q: 'Does my spouse automatically inherit everything if I die without a will?',
      a: 'Not necessarily. In many states, intestate succession splits your estate between your spouse and your children. Your spouse may receive one-third to one-half of the estate, with the remainder going to your children — including minor children whose shares are held in a court-supervised account until age 18.',
    },
    {
      q: 'What happens to my children if I die without a will?',
      a: 'A probate court appoints a guardian for your minor children. The court considers the child\'s best interests, but your personal wishes carry no legal weight without a written will. Your preferred guardian may not be appointed.',
    },
    {
      q: 'Can a handwritten will hold up in court?',
      a: 'Some states recognize holographic (handwritten) wills if they meet specific requirements — typically fully handwritten, signed, and dated. But requirements vary by state, and handwritten wills are more easily contested. A formally executed will witnessed by two adults is always preferable.',
    },
    {
      q: 'How much does it cost to create a will?',
      a: 'A simple will drafted by an estate planning attorney typically costs $300–$1,000. A comprehensive estate plan including a trust, powers of attorney, and healthcare directive runs $1,500–$5,000. Online services like LegalZoom offer lower-cost options for straightforward situations. The cost of not having one — in probate fees alone — is almost always higher.',
    },
  ],
}
