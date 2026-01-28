
export interface Employee {
  name: string;
  role: string;
  image: string;
  description?: string;
  email?: string;
  phone?: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Department {
  name: string;
  manager: Employee;
  members: TeamMember[];
  color: string;
}

export interface OnboardingTask {
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface Technology {
  name: string;
  description: string;
  logo: string;
}

export interface TeamPhoto {
  name: string;
  department: string;
  path: string;
}
