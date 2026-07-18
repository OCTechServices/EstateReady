import { BlogArticle } from '@/lib/blog'

export const article: BlogArticle = {
  slug: 'beneficiary-designation-mistakes',
  title: 'Beneficiary Designation Mistakes That Can Wreck an Estate Plan',
  description:
    'Your retirement accounts and life insurance pass directly to whoever is named on the beneficiary form — not through your will. Outdated or missing designations are one of the most common estate planning failures.',
  publishedAt: '2026-07-18',
  readTime: '6 min read',
  content: `
<div class="quick-answer">
  <p class="quick-answer-label">Quick Answer</p>
  <p>Beneficiary designations on retirement accounts and life insurance override your will entirely. If your designations are outdated — naming an ex-spouse, a deceased person, or no one — the asset may go to the wrong person, trigger unnecessary taxes, or pass through probate. Review and update them whenever your life changes.</p>
</div>

<p>Most people know they need a will. Far fewer realize that for retirement accounts, life insurance, and many bank accounts, the beneficiary designation form is the most important document — and it overrides everything else, including your will.</p>

<p>Here are the most common beneficiary designation mistakes, and what each one actually costs.</p>

<h2>Mistake 1: Never updating after a divorce</h2>

<p>This is the most financially damaging mistake in estate planning. If you named your ex-spouse as the beneficiary of your 401(k) or life insurance policy, they may legally receive that money when you die — regardless of your divorce decree, your current will, or any agreement you reached in the divorce settlement.</p>

<p>Some states automatically revoke beneficiary designations on divorce, but federal law governs most retirement accounts and overrides state law in many cases. You cannot rely on the state to fix this. Update the forms yourself, immediately after a divorce is finalized.</p>

<h2>Mistake 2: Naming a minor child directly</h2>

<p>Minor children cannot legally receive a large lump sum. If you name a minor as a direct beneficiary and die before they turn 18, a court must appoint a custodian to manage the funds until the child comes of age — an expensive, court-supervised process that was entirely avoidable.</p>

<p>The better approach: name a trust as the beneficiary, with instructions for how and when funds are distributed to the child. Or name a custodian under your state's Uniform Transfers to Minors Act (UTMA), which requires no trust but still controls the funds until adulthood.</p>

<h2>Mistake 3: Naming a special needs beneficiary directly</h2>

<p>A direct inheritance can disqualify a beneficiary with disabilities from means-tested government benefits like SSI and Medicaid. Even a relatively small inheritance — $2,000 in some programs — can trigger a loss of benefits until the money is spent down.</p>

<p>The solution is a special needs trust (also called a supplemental needs trust), which holds funds for the beneficiary's benefit without affecting eligibility for public assistance. This requires specific legal drafting — it is not something to handle with a generic form.</p>

<h2>Mistake 4: Naming your estate as beneficiary</h2>

<p>Naming your "estate" as the beneficiary of a retirement account is one of the most expensive mistakes you can make. It forces the account through probate, eliminates certain stretch distribution options that beneficiaries would otherwise have, and can significantly accelerate income tax on the funds.</p>

<p>Individual people and trusts are almost always better beneficiary designations than your estate. The only time naming the estate makes sense is if no other option is appropriate and your attorney specifically recommends it.</p>

<h2>Mistake 5: Failing to name a contingent beneficiary</h2>

<p>A primary beneficiary is who inherits if they are alive. A contingent beneficiary inherits if the primary is not. Without a contingent, if your primary beneficiary predeceases you, the asset may pass to your estate — triggering probate and losing the direct transfer benefit.</p>

<p>Always name at least one contingent beneficiary on every account.</p>

<h2>Mistake 6: Not reviewing designations after major life events</h2>

<p>Beneficiary designations are not set-and-forget. They should be reviewed after:</p>

<ul>
  <li>Marriage or remarriage</li>
  <li>Divorce or separation</li>
  <li>Birth or adoption of a child</li>
  <li>Death of a named beneficiary or contingent</li>
  <li>A beneficiary developing a disability or financial problems</li>
  <li>Significant changes in your estate or tax situation</li>
</ul>

<p>A good rule: review all beneficiary designations every three to five years, and immediately after any major life change.</p>

<h2>Which accounts have beneficiary designations?</h2>

<ul>
  <li><strong>Retirement accounts:</strong> 401(k), 403(b), IRA, Roth IRA, pension plans</li>
  <li><strong>Life insurance policies</strong></li>
  <li><strong>Annuities</strong></li>
  <li><strong>Bank accounts with a payable-on-death (POD) designation</strong></li>
  <li><strong>Brokerage accounts with a transfer-on-death (TOD) designation</strong></li>
  <li><strong>Health savings accounts (HSA)</strong></li>
</ul>

<p>These accounts represent, for many families, the majority of their financial assets. Getting the designations right is not a minor administrative task — it is foundational.</p>

<div class="blog-cta">
  <p class="blog-cta-label">When did you last review your beneficiary designations?</p>
  <p class="blog-cta-body">The Will &amp; Estate Ready assessment specifically evaluates your beneficiary designations alongside 6 other estate planning areas — and tells you exactly what needs attention. Takes about 10 minutes.</p>
  <a href="/intake" class="blog-cta-link">Start My Assessment — $21 →</a>
</div>
`,
  faq: [
    {
      q: 'Does my will control who inherits my 401(k)?',
      a: 'No. Retirement accounts pass by beneficiary designation, which overrides your will entirely. If your beneficiary designation names someone different from what your will says, the designation wins. This is why keeping designations current is as important as having a valid will.',
    },
    {
      q: 'What happens if I have no beneficiary named on my retirement account?',
      a: 'If no beneficiary is named, the account typically passes to your estate and goes through probate. This eliminates certain distribution options for heirs, can trigger faster income tax on the funds, and delays the transfer. Always name at least a primary and contingent beneficiary.',
    },
    {
      q: 'Can I change a beneficiary designation at any time?',
      a: 'Yes. Beneficiary designations can generally be changed at any time while you are competent. Contact the account custodian or insurance company to request a change-of-beneficiary form. Changes must be completed and on file before death to be effective.',
    },
    {
      q: 'Should a spouse always be named as primary beneficiary?',
      a: 'In most cases, yes — spouses receive favorable tax treatment on inherited retirement accounts (including the ability to roll it into their own IRA). But this depends on your overall plan. In second marriages or blended family situations, a trust structure may be more appropriate. Discuss with an estate planning attorney.',
    },
  ],
}
