import { BlogArticle } from '@/lib/blog'

export const article: BlogArticle = {
  slug: 'what-is-a-healthcare-directive',
  title: 'What Is a Healthcare Directive — and Why You Need One Before You Need It',
  description:
    'A healthcare directive documents your medical wishes and names someone to make decisions if you cannot. Without one, your family may face impossible choices — or worse, lose the ability to make them at all.',
  publishedAt: '2026-07-18',
  readTime: '5 min read',
  content: `
<div class="quick-answer">
  <p class="quick-answer-label">Quick Answer</p>
  <p>A healthcare directive is a legal document (sometimes two documents) that states your wishes for medical treatment and names someone to make healthcare decisions if you cannot speak for yourself. Without one, medical providers may be unable to communicate with your family, and your family may have no legal authority to make decisions on your behalf.</p>
</div>

<p>Most estate planning conversations focus on what happens after death. Healthcare directives are different — they address what happens if you are alive but unable to communicate or make decisions yourself. A serious accident, a medical emergency, a surgical complication. These events happen without warning, and the window to document your wishes closes the moment they do.</p>

<h2>What documents make up a healthcare directive?</h2>

<p>The term "healthcare directive" is often used loosely. In most states, there are two distinct documents:</p>

<ul>
  <li><strong>Healthcare power of attorney (HCPOA)</strong> — Names a person (your "healthcare agent" or "healthcare proxy") to make medical decisions on your behalf if you cannot. This person can consent to or refuse treatment, access your medical records, and communicate with your healthcare team.</li>
  <li><strong>Living will (advance directive)</strong> — Documents your specific wishes about medical treatment in defined situations: whether you want life-sustaining treatment if terminally ill, whether you want resuscitation, your preferences for artificial nutrition and hydration, and your wishes regarding organ donation.</li>
</ul>

<p>Many states combine these into a single document — often called an Advance Healthcare Directive. Requirements and terminology vary by state.</p>

<h2>What happens without a healthcare directive?</h2>

<p>Without a healthcare power of attorney, your medical team may not be able to discuss your condition with family members due to HIPAA — even your spouse. They will follow their clinical judgment and any applicable state default rules, but may not have legal authority to involve your family in decisions.</p>

<p>Without a living will, your family is left guessing what you would have wanted in critical situations — end-of-life care, resuscitation, withdrawal of life support. These are among the most emotionally difficult decisions a family can face, and being asked to make them without guidance is a significant burden.</p>

<p>Court intervention (conservatorship) may be required to authorize major medical decisions if no HCPOA exists and your family cannot agree.</p>

<h2>Who should you name as your healthcare agent?</h2>

<p>Your healthcare agent has authority over some of the most consequential decisions of your life. Choose someone who:</p>

<ul>
  <li>Knows your values well enough to make decisions consistent with your wishes</li>
  <li>Can handle stress and communicate clearly with medical professionals</li>
  <li>Will advocate for your expressed wishes even under family pressure</li>
  <li>Is available and geographically accessible in an emergency</li>
</ul>

<p>This person does not need to be a family member — it should be whoever you trust most to act in your interest, not in theirs or others'.</p>

<h2>What should a living will actually say?</h2>

<p>A generic living will with boilerplate language may not communicate what you actually want. Think through:</p>

<ul>
  <li>Under what circumstances do you want life-sustaining treatment withheld or withdrawn?</li>
  <li>What are your wishes regarding CPR and mechanical ventilation?</li>
  <li>Do you want artificial nutrition and hydration if you are in a persistent vegetative state?</li>
  <li>What are your organ and tissue donation preferences?</li>
  <li>Are there specific treatments you always want, regardless of prognosis?</li>
</ul>

<p>The more specific, the more useful the document is to your agent and your medical team.</p>

<h2>Does a healthcare directive expire?</h2>

<p>Most healthcare directives do not have a built-in expiration date, but they can become stale. Review and update your directive:</p>

<ul>
  <li>Every five to ten years</li>
  <li>After a major diagnosis or change in health</li>
  <li>If your healthcare agent is no longer the right person</li>
  <li>If you have moved to a different state (requirements vary)</li>
</ul>

<p>Tell your healthcare agent and your primary care physician that the document exists and where to find it. A directive no one knows about is not useful in an emergency.</p>

<div class="blog-cta">
  <p class="blog-cta-label">Do you have a healthcare directive in place?</p>
  <p class="blog-cta-body">The Will &amp; Estate Ready assessment evaluates your healthcare directive alongside your other estate planning documents — and identifies exactly what you are missing. Takes about 10 minutes.</p>
  <a href="/intake" class="blog-cta-link">Start My Assessment — $21 →</a>
</div>
`,
  faq: [
    {
      q: 'Is a living will the same as a do-not-resuscitate (DNR) order?',
      a: 'No. A living will is a private legal document expressing your general wishes. A DNR (or POLST — Physician Orders for Life-Sustaining Treatment) is a medical order signed by a physician that is immediately actionable in a clinical setting. Talk to your doctor if you want a DNR in place; a living will alone does not create one.',
    },
    {
      q: 'Does my healthcare directive work in other states?',
      a: 'Most states will honor a healthcare directive that was validly executed in another state, but requirements vary. If you split time between states or move, it is worth having an attorney review your documents to confirm they meet the requirements of your current state.',
    },
    {
      q: 'Can I change my healthcare directive after I create it?',
      a: 'Yes. You can revoke or amend your healthcare directive at any time while you are competent. Notify your healthcare agent, your physician, and anyone else who has a copy. Destroy prior versions to avoid confusion.',
    },
    {
      q: 'Should my healthcare agent be the same person as my financial power of attorney?',
      a: 'Not necessarily. Some people name the same trusted person for both roles; others separate them. The healthcare agent needs emotional intelligence and availability in a crisis. The financial POA needs organizational ability and financial judgment. Think about who is best suited for each role, not who is easiest to ask.',
    },
  ],
}
