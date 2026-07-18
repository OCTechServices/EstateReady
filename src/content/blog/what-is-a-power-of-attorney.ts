import { BlogArticle } from '@/lib/blog'

export const article: BlogArticle = {
  slug: 'what-is-a-power-of-attorney',
  title: 'What Is a Power of Attorney — and Do You Actually Need One?',
  description:
    'A power of attorney lets someone you trust manage your finances and legal affairs if you cannot. Without one, your family may have to go to court to get that authority. Here is how it works.',
  publishedAt: '2026-07-18',
  readTime: '5 min read',
  content: `
<div class="quick-answer">
  <p class="quick-answer-label">Quick Answer</p>
  <p>A power of attorney (POA) is a legal document that gives someone you name — your "agent" — the authority to manage your financial and legal affairs. Without a durable POA, if you become incapacitated, your family may have no legal authority to pay your bills, access your accounts, or manage your property without going to court first.</p>
</div>

<p>Most people associate estate planning with death — wills, inheritance, what happens after you are gone. But some of the most important documents in an estate plan are designed for what happens while you are still alive but unable to act for yourself.</p>

<p>A power of attorney is one of them.</p>

<h2>What does a power of attorney actually authorize?</h2>

<p>A power of attorney is a legal document in which you (the "principal") grant another person (your "agent" or "attorney-in-fact") the authority to act on your behalf in financial and legal matters. Depending on how it is written, this can include:</p>

<ul>
  <li>Paying your bills and managing your bank accounts</li>
  <li>Filing your tax returns</li>
  <li>Managing or selling real estate</li>
  <li>Operating or selling a business</li>
  <li>Making investment decisions</li>
  <li>Applying for government benefits on your behalf</li>
</ul>

<p>A POA does not give your agent authority over medical decisions — that is handled by a separate document called a healthcare power of attorney or healthcare proxy.</p>

<h2>What is the difference between a durable and a non-durable POA?</h2>

<p>This distinction matters significantly:</p>

<ul>
  <li><strong>Non-durable POA:</strong> Automatically terminates if you become incapacitated. This type is used for specific, time-limited transactions (like authorizing someone to close on a real estate sale while you are traveling).</li>
  <li><strong>Durable POA:</strong> Remains in effect even if you become mentally incapacitated. This is the type used in estate planning — the whole point is to have someone authorized to act when you cannot.</li>
  <li><strong>Springing POA:</strong> Only takes effect under specified conditions, typically incapacity. Some states allow these; others do not. They can be difficult to use in practice because third parties often require proof of incapacity before accepting the document.</li>
</ul>

<p>For estate planning purposes, a durable power of attorney is almost always what you need.</p>

<h2>What happens if you become incapacitated without a POA?</h2>

<p>Without a durable POA, your family has no automatic legal authority to manage your finances — even your spouse may face restrictions depending on your state and how assets are titled.</p>

<p>To gain that authority, a family member would need to petition a court for a conservatorship (sometimes called guardianship of the estate). This process:</p>

<ul>
  <li>Takes weeks to months to complete</li>
  <li>Requires ongoing court supervision and annual reporting</li>
  <li>Costs thousands of dollars in legal and court fees</li>
  <li>Is public record</li>
</ul>

<p>A durable POA, properly executed before incapacity, makes all of this unnecessary.</p>

<h2>Who should you name as your agent?</h2>

<p>Your agent has significant power over your financial life. Choose someone who is:</p>

<ul>
  <li>Trustworthy and organized</li>
  <li>Willing and able to act on your behalf</li>
  <li>Likely to outlive you (not an elderly parent)</li>
  <li>Geographically accessible if in-person action may be needed</li>
</ul>

<p>You should also name a successor agent — someone who steps in if your first choice cannot serve. A POA with no functional agent is as useless as no POA at all.</p>

<h2>Do you need both a financial POA and a healthcare POA?</h2>

<p>Yes. These are separate documents covering separate domains:</p>

<ul>
  <li><strong>Financial (durable) power of attorney</strong> — covers financial and legal matters</li>
  <li><strong>Healthcare power of attorney (or healthcare proxy)</strong> — names someone to make medical decisions if you cannot</li>
  <li><strong>Advance healthcare directive (living will)</strong> — documents your preferences for specific medical situations, such as life-sustaining treatment</li>
</ul>

<p>A comprehensive estate plan includes all three. Many people have none.</p>

<h2>When does a power of attorney end?</h2>

<p>A POA automatically terminates at your death — at that point, your executor or trustee takes over based on your will or trust. A POA also terminates if you revoke it in writing, or (for non-durable POAs) if you become incapacitated.</p>

<p>Keep your POA current. If the person you named is no longer the right choice — or has predeceased you — update the document.</p>

<div class="blog-cta">
  <p class="blog-cta-label">Do you have a power of attorney in place?</p>
  <p class="blog-cta-body">The Will &amp; Estate Ready assessment evaluates your existing documents — including financial and healthcare powers of attorney — and identifies gaps across all 7 areas of your estate plan. Takes about 10 minutes.</p>
  <a href="/intake" class="blog-cta-link">Start My Assessment — $21 →</a>
</div>
`,
  faq: [
    {
      q: 'Can a spouse automatically manage finances without a POA?',
      a: 'Not always. Your spouse may be able to access joint accounts, but individually titled assets — investment accounts, real estate in your name alone, business interests — typically require legal authority your spouse does not automatically have. A durable POA provides that authority without court involvement.',
    },
    {
      q: 'Can a POA be used to change my will or beneficiaries?',
      a: 'Generally, no. A standard POA does not give your agent authority to change your will or alter beneficiary designations on retirement accounts or life insurance — those are considered too personal. Some POAs specifically prohibit it. Review your document carefully and discuss any concerns with your attorney.',
    },
    {
      q: 'Does a power of attorney need to be notarized?',
      a: 'Requirements vary by state, but most states require a durable POA to be signed before a notary, two witnesses, or both. A POA that does not meet your state\'s execution requirements may not be accepted by banks, financial institutions, or courts.',
    },
    {
      q: 'What is the difference between a power of attorney and a living trust?',
      a: 'A power of attorney grants authority to act on your behalf during your lifetime. A living trust is a legal entity that holds your assets and is managed by a trustee — which can be you initially, with a successor trustee taking over at incapacity or death. Many comprehensive estate plans use both: a POA for assets not in the trust, and a trust for the bulk of the estate.',
    },
  ],
}
