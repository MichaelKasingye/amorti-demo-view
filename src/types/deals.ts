
export interface Contact {
  contactID: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  employer: string;
  company: string;
  industry: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: string;
  source: string;
  lastContactedAt: string;
}

export interface DealNote {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export type DealType = 'account' | 'loan';

export interface Deal {
  id: string;
  dealType: DealType;
  departmentId: string;
  productId: string;
  description: string;
  currency: string;
  loanAmount: number;
  loanTerm: number;
  salary: number;
  PTI: number;
  totalInterest: number;
  runningLoan: number;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  expectedClosingDate: string;
  closedAt: string;
  source: string;
  contact: Contact;
  notes?: DealNote[];
}

export const dealTypeLabels: Record<DealType, string> = {
  account: 'Account',
  loan: 'Loan'
};

export const dealTypeBadgeStyles: Record<DealType, string> = {
  account: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  loan: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
};

export interface ProductOption {
  id: string;
  name: string;
  dealType: DealType;
}

export const accountProductOptions: ProductOption[] = [
  { id: 'acc-toto', name: 'Toto Account', dealType: 'account' },
  { id: 'acc-student', name: 'Student Account', dealType: 'account' },
  { id: 'acc-current', name: 'Current Account', dealType: 'account' },
  { id: 'acc-savings', name: 'Savings Account', dealType: 'account' },
  { id: 'acc-salary', name: 'Salary Account', dealType: 'account' },
];

export const loanProductOptions: ProductOption[] = [
  { id: 'loan-personal-secured', name: 'Personal Secured Loan', dealType: 'loan' },
  { id: 'loan-personal-unsecured', name: 'Personal Unsecured Loan', dealType: 'loan' },
  { id: 'loan-business', name: 'Business Loan', dealType: 'loan' },
  { id: 'loan-mortgage', name: 'Mortgage Loan', dealType: 'loan' },
  { id: 'loan-salary', name: 'Salary Loan', dealType: 'loan' },
];

export const productOptionsByDealType: Record<DealType, ProductOption[]> = {
  account: accountProductOptions,
  loan: loanProductOptions,
};

export const stageLabels = {
  'discovery': 'Discovery',
  'proposal': 'Proposal',
  'negotiation': 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost'
};

export const stageBadgeStyles = {
  'discovery': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'proposal': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'negotiation': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  'closed-won': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'closed-lost': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

export const sampleDeals: Deal[] = [
  {
    id: 'd1',
    dealType: 'loan',
    departmentId: 'dept1',
    productId: 'loan-personal-secured',
    description: 'Enterprise software license for growing business needs',
    currency: 'UGX',
    loanAmount: 12500000,
    loanTerm: 5,
    salary: 2500000,
    PTI: 25,
    totalInterest: 15,
    runningLoan: 0,
    stage: 'proposal',
    expectedClosingDate: '2023-06-30',
    closedAt: '',
    source: 'sales',
    contact: {
      contactID: 'contact1',
      firstName: 'Alex',
      lastName: 'Johnson',
      name: 'Alex Johnson',
      email: 'alex.johnson@acme.com',
      phoneNumber: '+256-700-123456',
      jobTitle: 'IT Manager',
      employer: 'HFB',
      company: 'HFB',
      industry: 'Technology',
      address: '123 Business St',
      city: 'Kampala',
      state: 'Central',
      zipCode: '00256',
      country: 'Uganda',
      status: 'active',
      source: 'referral',
      lastContactedAt: '2023-05-25T10:30:00Z'
    },
    notes: [
      {
        id: 'note1',
        title: 'Initial Discovery Call',
        description: 'Had a great initial call with the client. They are looking for a comprehensive solution to manage their growing team.',
        createdAt: '2023-05-15T10:30:00Z',
        createdBy: 'Alex Johnson'
      }
    ]
  },
  {
    id: 'd2',
    dealType: 'loan',
    departmentId: 'dept2',
    productId: 'loan-business',
    description: 'Consulting services for process optimization',
    currency: 'UGX',
    loanAmount: 8750000,
    loanTerm: 3,
    salary: 1800000,
    PTI: 30,
    totalInterest: 12,
    runningLoan: 500000,
    stage: 'discovery',
    expectedClosingDate: '2023-07-15',
    closedAt: '',
    source: 'marketing',
    contact: {
      contactID: 'contact2',
      firstName: 'Sarah',
      lastName: 'Williams',
      name: 'Sarah Williams',
      email: 'sarah.williams@xyz.com',
      phoneNumber: '+256-700-789012',
      jobTitle: 'Operations Manager',
      employer: 'XYZ Corp',
      company: 'XYZ Corp',
      industry: 'Manufacturing',
      address: '456 Industrial Ave',
      city: 'Entebbe',
      state: 'Central',
      zipCode: '00257',
      country: 'Uganda',
      status: 'active',
      source: 'website',
      lastContactedAt: '2023-05-20T14:15:00Z'
    },
    notes: []
  },
  {
    id: 'd3',
    dealType: 'account',
    departmentId: 'dept1',
    productId: 'acc-current',
    description: 'New current account for everyday banking needs',
    currency: 'UGX',
    loanAmount: 0,
    loanTerm: 0,
    salary: 0,
    PTI: 0,
    totalInterest: 0,
    runningLoan: 0,
    stage: 'closed-won',
    expectedClosingDate: '2023-06-10',
    closedAt: '2023-06-10',
    source: 'website',
    contact: {
      contactID: 'contact3',
      firstName: 'Bob',
      lastName: 'Wilson',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phoneNumber: '+256-700-345678',
      jobTitle: 'Accountant',
      employer: 'Self',
      company: '',
      industry: '',
      address: '789 Market Rd',
      city: 'Jinja',
      state: 'Eastern',
      zipCode: '00258',
      country: 'Uganda',
      status: 'active',
      source: 'website',
      lastContactedAt: '2023-06-05T09:00:00Z'
    },
    notes: []
  }
];
