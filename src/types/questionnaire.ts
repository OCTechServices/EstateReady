export type Domain =
  | 'personal_family'
  | 'assets'
  | 'existing_documents'
  | 'beneficiary_designations'
  | 'insurance'
  | 'tax_legacy'
  | 'special_circumstances'

export interface Question {
  id: string
  domain: Domain
  text: string
  annotation?: string
  options: QuestionOption[]
}

export interface QuestionOption {
  value: string
  label: string
  gapScore: number       // 0 = no gap, 1 = moderate, 2 = high gap
  complexityScore: number // 0 = simple, 1 = moderate, 2 = complex
}

export type Answers = Record<string, string>

export type Tier = 1 | 2 | 3 | 4

export interface ScoringResult {
  score: number
  tier: Tier
  escalators: string[]
}

export const TIER_LABELS: Record<Tier, string> = {
  1: 'Foundational',
  2: 'Developing',
  3: 'Complex',
  4: 'Urgent',
}

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  1: 'Your situation is relatively straightforward. A basic will and powers of attorney are likely sufficient to get you protected.',
  2: 'You have moderate complexity or meaningful gaps. A structured planning session with an estate attorney is recommended.',
  3: 'Your estate involves significant complexity — high asset value, business interests, or special circumstances that require careful planning.',
  4: 'You have critical gaps combined with high exposure. Engaging an estate planning attorney promptly is strongly recommended.',
}

export const DOMAIN_LABELS: Record<Domain, string> = {
  personal_family: 'Personal & Family',
  assets: 'Assets & Wealth',
  existing_documents: 'Existing Documents',
  beneficiary_designations: 'Beneficiary Designations',
  insurance: 'Insurance & Protection',
  tax_legacy: 'Tax & Legacy',
  special_circumstances: 'Special Circumstances',
}

export const QUESTIONS: Question[] = [
  // Domain 1 — Personal & Family
  {
    id: 'PF1',
    domain: 'personal_family',
    text: 'What is your age range?',
    options: [
      { value: 'under_30', label: 'Under 30', gapScore: 0, complexityScore: 0 },
      { value: '30_40', label: '30–40', gapScore: 0, complexityScore: 0 },
      { value: '41_55', label: '41–55', gapScore: 1, complexityScore: 1 },
      { value: '56_65', label: '56–65', gapScore: 1, complexityScore: 1 },
      { value: '65_plus', label: '65+', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'PF2',
    domain: 'personal_family',
    text: 'What state do you primarily reside in?',
    options: [
      { value: 'community_property', label: 'Community property state (CA, TX, AZ, NV, WA, ID, NM, WI, AK)', gapScore: 0, complexityScore: 2 },
      { value: 'common_law', label: 'Common law state (all others)', gapScore: 0, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 1, complexityScore: 1 },
    ],
  },
  {
    id: 'PF3',
    domain: 'personal_family',
    text: 'What is your marital or partnership status?',
    options: [
      { value: 'single', label: 'Single', gapScore: 0, complexityScore: 0 },
      { value: 'married', label: 'Married', gapScore: 0, complexityScore: 1 },
      { value: 'divorced', label: 'Divorced', gapScore: 1, complexityScore: 1 },
      { value: 'widowed', label: 'Widowed', gapScore: 1, complexityScore: 1 },
      { value: 'domestic_partner', label: 'Domestic partner', gapScore: 1, complexityScore: 2 },
      { value: 'separated', label: 'Separated', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'PF4',
    domain: 'personal_family',
    text: 'Is your spouse or partner a US citizen?',
    annotation: 'A non-citizen spouse cannot receive the unlimited marital deduction under federal law — this changes the entire planning approach and often requires a Qualified Domestic Trust (QDOT).',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 2 },
      { value: 'na', label: 'N/A — not married or partnered', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'PF5',
    domain: 'personal_family',
    text: 'Do you have children?',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'minor_only', label: 'Yes, minor children only', gapScore: 2, complexityScore: 2 },
      { value: 'adult_only', label: 'Yes, adult children only', gapScore: 0, complexityScore: 1 },
      { value: 'both', label: 'Yes, both minor and adult', gapScore: 2, complexityScore: 2 },
      { value: 'prior_relationship', label: 'Yes, including children from a prior relationship', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'PF6',
    domain: 'personal_family',
    text: 'Do you have grandchildren you wish to include in your estate plan?',
    annotation: 'Gifts or bequests that skip a generation trigger Generation-Skipping Transfer (GST) tax — a separate federal tax most clients are unaware of.',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 1, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'PF7',
    domain: 'personal_family',
    text: 'Do you have a dependent with a disability, special needs, or a condition requiring long-term care?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 2, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },

  // Domain 2 — Assets & Wealth
  {
    id: 'AS1',
    domain: 'assets',
    text: 'What is your estimated total estate value — all assets combined?',
    options: [
      { value: 'under_100k', label: 'Under $100,000', gapScore: 0, complexityScore: 0 },
      { value: '100k_500k', label: '$100,000–$500,000', gapScore: 0, complexityScore: 1 },
      { value: '500k_1m', label: '$500,000–$1,000,000', gapScore: 1, complexityScore: 1 },
      { value: '1m_5m', label: '$1,000,000–$5,000,000', gapScore: 1, complexityScore: 2 },
      { value: '5m_13m', label: '$5,000,000–$13,000,000', gapScore: 2, complexityScore: 2 },
      { value: 'over_13m', label: 'Over $13,000,000', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'AS2',
    domain: 'assets',
    text: 'Do you own real estate?',
    annotation: 'Real estate in another state requires a separate probate proceeding in that state (ancillary probate). A trust eliminates this entirely.',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'primary_only', label: 'Primary home only', gapScore: 0, complexityScore: 1 },
      { value: 'primary_plus', label: 'Primary + investment or rental property', gapScore: 1, complexityScore: 2 },
      { value: 'multiple_including_out_of_state', label: 'Multiple properties, including out-of-state', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'AS3',
    domain: 'assets',
    text: 'How are your primary assets currently titled?',
    options: [
      { value: 'sole', label: 'Solely in my name', gapScore: 1, complexityScore: 1 },
      { value: 'jtwros', label: 'Joint tenancy with right of survivorship', gapScore: 0, complexityScore: 1 },
      { value: 'tic', label: 'Tenants in common', gapScore: 1, complexityScore: 2 },
      { value: 'trust', label: 'Held in a trust', gapScore: 0, complexityScore: 0 },
      { value: 'mixed', label: 'Mixed or not sure', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'AS4',
    domain: 'assets',
    text: 'Do you have retirement accounts?',
    annotation: 'Under the SECURE Act 2.0, most non-spouse beneficiaries must fully withdraw inherited IRAs within 10 years. The tax impact of inheriting a traditional vs. Roth account is significant — and affects who you should name as beneficiary.',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'traditional', label: 'Yes, traditional (401k, IRA, pension)', gapScore: 1, complexityScore: 1 },
      { value: 'roth', label: 'Yes, Roth (IRA, 401k)', gapScore: 0, complexityScore: 1 },
      { value: 'both', label: 'Both traditional and Roth', gapScore: 1, complexityScore: 2 },
    ],
  },
  {
    id: 'AS5',
    domain: 'assets',
    text: 'Do you own or hold an interest in a business?',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'sole_prop', label: 'Sole proprietor', gapScore: 2, complexityScore: 1 },
      { value: 'llc_partnership', label: 'LLC or partnership', gapScore: 2, complexityScore: 2 },
      { value: 'corp', label: 'S-Corp or C-Corp', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'AS6',
    domain: 'assets',
    text: 'Do you hold significant digital assets or assets outside the United States?',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'crypto', label: 'Cryptocurrency or NFTs', gapScore: 2, complexityScore: 2 },
      { value: 'international', label: 'Assets outside the US', gapScore: 2, complexityScore: 2 },
      { value: 'both', label: 'Both', gapScore: 2, complexityScore: 2 },
    ],
  },
  {
    id: 'AS7',
    domain: 'assets',
    text: 'Do you expect to receive a significant inheritance within the next 10 years?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 1, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'unsure', label: 'Unsure', gapScore: 0, complexityScore: 1 },
    ],
  },

  // Domain 3 — Existing Documents
  {
    id: 'ED1',
    domain: 'existing_documents',
    text: 'Do you have a will?',
    options: [
      { value: 'none', label: 'No', gapScore: 2, complexityScore: 0 },
      { value: 'outdated', label: 'Yes, but not reviewed in 5+ years', gapScore: 2, complexityScore: 0 },
      { value: 'current', label: 'Yes, reviewed within the past 5 years', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'ED2',
    domain: 'existing_documents',
    text: 'Do you have a trust?',
    options: [
      { value: 'none', label: 'No', gapScore: 1, complexityScore: 0 },
      { value: 'revocable', label: 'Yes, revocable living trust', gapScore: 0, complexityScore: 0 },
      { value: 'irrevocable', label: 'Yes, irrevocable trust', gapScore: 0, complexityScore: 0 },
      { value: 'multiple', label: 'Multiple trusts', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'ED3',
    domain: 'existing_documents',
    text: 'Do you have a financial (durable) power of attorney?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 2, complexityScore: 0 },
    ],
  },
  {
    id: 'ED4',
    domain: 'existing_documents',
    text: 'Do you have a healthcare power of attorney?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 2, complexityScore: 0 },
    ],
  },
  {
    id: 'ED5',
    domain: 'existing_documents',
    text: 'Do you have an advance healthcare directive or living will?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 1, complexityScore: 0 },
    ],
  },
  {
    id: 'ED6',
    domain: 'existing_documents',
    text: 'Do you have a HIPAA authorization on file?',
    annotation: 'Without a HIPAA authorization, even your named healthcare agent may be blocked from accessing your medical records in an emergency. It is the most overlooked document in estate planning.',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 1, complexityScore: 0 },
    ],
  },
  {
    id: 'ED7',
    domain: 'existing_documents',
    text: 'When did you last review your estate plan with an attorney?',
    options: [
      { value: 'never', label: 'Never', gapScore: 2, complexityScore: 0 },
      { value: 'over_5_years', label: 'More than 5 years ago', gapScore: 2, complexityScore: 0 },
      { value: 'within_5_years', label: 'Within the past 5 years', gapScore: 1, complexityScore: 0 },
      { value: 'within_2_years', label: 'Within the past 2 years', gapScore: 0, complexityScore: 0 },
    ],
  },

  // Domain 4 — Beneficiary Designations
  {
    id: 'BD1',
    domain: 'beneficiary_designations',
    text: 'Have you reviewed retirement account beneficiaries in the past 3 years?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 0 },
      { value: 'na', label: 'No retirement accounts', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'BD2',
    domain: 'beneficiary_designations',
    text: 'Have you reviewed life insurance beneficiaries in the past 3 years?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 0 },
      { value: 'na', label: 'No life insurance', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'BD3',
    domain: 'beneficiary_designations',
    text: 'Do you have payable-on-death (POD) or transfer-on-death (TOD) designations on bank or brokerage accounts?',
    annotation: 'POD/TOD designations pass assets directly to named individuals — bypassing your will and probate entirely. If not updated after a divorce or death, the wrong person receives the asset.',
    options: [
      { value: 'yes_updated', label: 'Yes, and they are current', gapScore: 0, complexityScore: 0 },
      { value: 'yes_unsure', label: 'Yes, but I have not reviewed them recently', gapScore: 2, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 2, complexityScore: 0 },
    ],
  },
  {
    id: 'BD4',
    domain: 'beneficiary_designations',
    text: 'Do any beneficiary designations name a minor child directly, without a trust or custodian?',
    annotation: 'A minor cannot legally receive a direct inheritance. Without a trust or UTMA custodianship, a court appoints a guardian of the property — an expensive and public process that overrides your intentions.',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 2, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 2, complexityScore: 1 },
    ],
  },
  {
    id: 'BD5',
    domain: 'beneficiary_designations',
    text: 'Are your beneficiary designations consistent with your will or trust?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 2, complexityScore: 1 },
      { value: 'unsure', label: 'Not sure', gapScore: 2, complexityScore: 1 },
      { value: 'no_docs', label: 'I do not have a will or trust', gapScore: 2, complexityScore: 0 },
    ],
  },

  // Domain 5 — Insurance & Protection
  {
    id: 'IN1',
    domain: 'insurance',
    text: 'Do you have life insurance?',
    options: [
      { value: 'none', label: 'No', gapScore: 1, complexityScore: 0 },
      { value: 'term', label: 'Yes, term life', gapScore: 0, complexityScore: 0 },
      { value: 'permanent', label: 'Yes, permanent (whole, universal, or variable)', gapScore: 0, complexityScore: 1 },
    ],
  },
  {
    id: 'IN2',
    domain: 'insurance',
    text: 'Who owns your life insurance policy?',
    annotation: 'Life insurance proceeds owned personally are included in your taxable estate. An Irrevocable Life Insurance Trust (ILIT) removes the death benefit from your estate entirely — potentially saving your family significant estate taxes.',
    options: [
      { value: 'personal', label: 'I own it personally', gapScore: 1, complexityScore: 1 },
      { value: 'ilit', label: 'Owned by a trust (ILIT)', gapScore: 0, complexityScore: 0 },
      { value: 'na', label: 'N/A — no life insurance', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'IN3',
    domain: 'insurance',
    text: 'Do you have long-term care insurance?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'evaluating', label: 'Currently evaluating', gapScore: 1, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
    ],
  },
  {
    id: 'IN4',
    domain: 'insurance',
    text: 'Do you have an umbrella or excess liability policy?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
    ],
  },

  // Domain 6 — Tax & Legacy
  {
    id: 'TX1',
    domain: 'tax_legacy',
    text: 'Are you aware that the current federal estate tax exemption (~$13.6M per person) is scheduled to sunset at the end of 2025, potentially dropping to ~$7M?',
    annotation: 'This is the most time-sensitive estate planning issue of this decade. Clients with estates between $7M–$13M have a closing window to use the current exemption through strategic gifting. After the sunset, those opportunities may be gone.',
    options: [
      { value: 'aware_affects', label: 'Yes, and it directly affects my planning', gapScore: 2, complexityScore: 2 },
      { value: 'aware_below', label: 'Yes, but I am below the threshold', gapScore: 0, complexityScore: 1 },
      { value: 'unaware', label: 'No, I was not aware of this', gapScore: 1, complexityScore: 1 },
    ],
  },
  {
    id: 'TX2',
    domain: 'tax_legacy',
    text: 'Do you make regular annual gifts to family members or charitable organizations?',
    options: [
      { value: 'yes', label: 'Yes, regularly', gapScore: 0, complexityScore: 1 },
      { value: 'occasionally', label: 'Occasionally', gapScore: 0, complexityScore: 0 },
      { value: 'no', label: 'No', gapScore: 1, complexityScore: 0 },
    ],
  },
  {
    id: 'TX3',
    domain: 'tax_legacy',
    text: 'Do you have meaningful charitable giving goals — a cause, organization, or legacy fund?',
    options: [
      { value: 'priority', label: 'Yes, it is a priority', gapScore: 0, complexityScore: 2 },
      { value: 'possibly', label: 'Possibly', gapScore: 0, complexityScore: 1 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'TX4',
    domain: 'tax_legacy',
    text: 'How do you intend to distribute your estate?',
    options: [
      { value: 'equally', label: 'Equally among all heirs', gapScore: 0, complexityScore: 0 },
      { value: 'by_need', label: 'Based on individual need or circumstance', gapScore: 0, complexityScore: 1 },
      { value: 'charity', label: 'Primarily to charity', gapScore: 0, complexityScore: 2 },
      { value: 'combination', label: 'Some combination', gapScore: 0, complexityScore: 1 },
      { value: 'undecided', label: 'Have not decided', gapScore: 1, complexityScore: 0 },
    ],
  },

  // Domain 7 — Special Circumstances
  {
    id: 'SC1',
    domain: 'special_circumstances',
    text: 'Have you experienced a major life event in the past 2 years?',
    options: [
      { value: 'none', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'marriage', label: 'Marriage', gapScore: 1, complexityScore: 1 },
      { value: 'divorce', label: 'Divorce or separation', gapScore: 2, complexityScore: 2 },
      { value: 'new_child', label: 'New child or grandchild', gapScore: 2, complexityScore: 1 },
      { value: 'death_spouse', label: 'Death of a spouse or partner', gapScore: 2, complexityScore: 2 },
      { value: 'inheritance', label: 'Significant inheritance or windfall', gapScore: 1, complexityScore: 2 },
      { value: 'net_worth_change', label: 'Major change in net worth', gapScore: 1, complexityScore: 2 },
    ],
  },
  {
    id: 'SC2',
    domain: 'special_circumstances',
    text: 'Do you own property or hold assets in more than one state?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 2, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'SC3',
    domain: 'special_circumstances',
    text: 'Is there meaningful risk of family conflict, disputed guardianship, or contested inheritance in your estate?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 2, complexityScore: 2 },
      { value: 'possibly', label: 'Possibly', gapScore: 1, complexityScore: 1 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'SC4',
    domain: 'special_circumstances',
    text: 'Do any intended beneficiaries have issues with debt, creditors, substance dependency, or financial instability?',
    annotation: 'Without a spendthrift trust, a beneficiary\'s creditors can seize an inherited lump sum. A discretionary trust protects them from themselves and from outside claims.',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 2, complexityScore: 2 },
      { value: 'possibly', label: 'Possibly', gapScore: 1, complexityScore: 1 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'prefer_not', label: 'Prefer not to say', gapScore: 1, complexityScore: 1 },
    ],
  },
  {
    id: 'SC5',
    domain: 'special_circumstances',
    text: 'Are you in a profession or business with significant personal liability exposure?',
    options: [
      { value: 'yes', label: 'Yes (medical, legal, financial, construction, real estate)', gapScore: 1, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
    ],
  },
  {
    id: 'SC6',
    domain: 'special_circumstances',
    text: 'Have you made taxable gifts exceeding $18,000 per recipient in any of the past 5 years?',
    options: [
      { value: 'yes', label: 'Yes', gapScore: 0, complexityScore: 2 },
      { value: 'no', label: 'No', gapScore: 0, complexityScore: 0 },
      { value: 'unsure', label: 'Not sure', gapScore: 1, complexityScore: 1 },
    ],
  },
]

export const QUESTIONS_BY_DOMAIN: Record<Domain, Question[]> = QUESTIONS.reduce(
  (acc, q) => {
    if (!acc[q.domain]) acc[q.domain] = []
    acc[q.domain].push(q)
    return acc
  },
  {} as Record<Domain, Question[]>
)

export const DOMAIN_ORDER: Domain[] = [
  'personal_family',
  'assets',
  'existing_documents',
  'beneficiary_designations',
  'insurance',
  'tax_legacy',
  'special_circumstances',
]
