export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;
    employmentHistory: EmploymentHistory[];
  }
  
  export interface EmploymentHistory {
    startDate: Date;
    endDate?: Date;
    position: string;
    company: string;
  }