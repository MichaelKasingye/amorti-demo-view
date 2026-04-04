
import { ContactData } from "@/components/contacts/types";

export interface Contact extends ContactData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactsApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy contacts data
const DUMMY_CONTACTS: Contact[] = [
  {
    id: "contact_1",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    email: "john.doe@housingfinancebank.com",
    phoneNumber: "+1-555-123-4567",
    jobTitle: "Financial Manager",
    company: "ABC Corporation",
    industry: "Financial Services",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    status: "active",
    source: "referral",
    lastContactedAt: "2024-06-10T10:00:00Z",
    createdAt: "2024-06-01T09:00:00Z",
    updatedAt: "2024-06-10T10:00:00Z"
  },
  {
    id: "contact_2",
    firstName: "Jane",
    lastName: "Smith",
    name: "Jane Smith",
    email: "jane.smith@techcorp.com",
    phoneNumber: "+1-555-987-6543",
    jobTitle: "CEO",
    company: "TechCorp Inc",
    industry: "Technology",
    address: "456 Oak Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
    status: "prospect",
    source: "website",
    lastContactedAt: "2024-06-12T14:30:00Z",
    createdAt: "2024-06-05T11:15:00Z",
    updatedAt: "2024-06-12T14:30:00Z"
  }
];

class ContactsApiService {
  private contacts: Contact[] = [...DUMMY_CONTACTS];

  async getContacts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<ContactsApiResponse<Contact[]>> {
    await simulateDelay();
    
    let filteredContacts = [...this.contacts];
    
    // Apply filters
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.company.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params?.status) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.status === params.status
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex);
    
    return {
      data: paginatedContacts,
      message: "Contacts retrieved successfully",
      success: true,
      total: filteredContacts.length
    };
  }

  async getContactById(id: string): Promise<ContactsApiResponse<Contact>> {
    await simulateDelay();
    
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    
    return {
      data: contact,
      message: "Contact retrieved successfully",
      success: true
    };
  }

  async createContact(contactData: ContactData): Promise<ContactsApiResponse<Contact>> {
    await simulateDelay();
    
    // Simulate validation
    if (!contactData.firstName || !contactData.lastName || !contactData.email) {
      throw new Error("First name, last name, and email are required");
    }
    
    // Check for duplicate email
    if (this.contacts.some(c => c.email === contactData.email)) {
      throw new Error("Contact with this email already exists");
    }
    
    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      ...contactData,
      name: contactData.name || `${contactData.firstName} ${contactData.lastName}`.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.contacts.push(newContact);
    
    return {
      data: newContact,
      message: "Contact created successfully",
      success: true
    };
  }

  async updateContact(id: string, contactData: Partial<ContactData>): Promise<ContactsApiResponse<Contact>> {
    await simulateDelay();
    
    const contactIndex = this.contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error("Contact not found");
    }
    
    const updatedContact = {
      ...this.contacts[contactIndex],
      ...contactData,
      updatedAt: new Date().toISOString()
    };
    
    // Auto-generate full name if first or last name changed
    if (contactData.firstName || contactData.lastName) {
      updatedContact.name = `${updatedContact.firstName} ${updatedContact.lastName}`.trim();
    }
    
    this.contacts[contactIndex] = updatedContact;
    
    return {
      data: updatedContact,
      message: "Contact updated successfully",
      success: true
    };
  }

  async deleteContact(id: string): Promise<ContactsApiResponse<null>> {
    await simulateDelay();
    
    const contactIndex = this.contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error("Contact not found");
    }
    
    this.contacts.splice(contactIndex, 1);
    
    return {
      data: null,
      message: "Contact deleted successfully",
      success: true
    };
  }
}

export const contactsApi = new ContactsApiService();
