
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

export interface Deal {
  id: string;
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
    departmentId: 'dept1',
    productId: 'prod1',
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
    departmentId: 'dept2',
    productId: 'prod2',
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
  }
];
