export interface Member {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  image: string;
  email: string;
  phone?: string;
}

export interface Project {
  id: string;
  name: string;
  manager: Member;
  deadline: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Planning';
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  budget: string;
}

export interface Department {
  id: string;
  name: string;
  managerName: string;
  memberCount: number;
  projectCount: number;
  status: 'Active' | 'Restructuring';
  parentId?: string; // For tree structure
}

export interface OrgNode {
  id: string;
  name: string;
  type: 'Company' | 'Branch' | 'Department';
  children?: OrgNode[];
}

export interface PermissionRole {
  id: string;
  roleName: string;
  usersCount: number;
  description: string;
  accessLevel: 'Admin' | 'Editor' | 'Viewer';
}

export interface FileItem {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'XLS' | 'IMG' | 'ZIP' | 'FOLDER';
  size: string;
  owner: string;
  date: string;
  parentId?: string; // For folder navigation
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  module: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Error';
  ip: string;
}

export interface ChartData {
  name: string;
  value1: number;
  value2?: number;
  value3?: number;
}

export interface StatData {
  title: string;
  translationKey?: string; 
  value: string;
  trend?: string; 
  trendUp?: boolean;
  data: number[]; 
  iconName: string;
  color: string;
}

// New Types for Healthcare/Hospital Management Extensions
export interface Appointment {
  id: string;
  doctorName: string;
  doctorImage: string;
  patientName: string;
  disease: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Available' | 'In Surgery' | 'On Leave';
  image: string;
  email: string;
  phone: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  image: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  image: string;
  status: 'Admitted' | 'Discharged' | 'Critical';
  age: number;
  gender: string;
  diagnosis: string;
  admissionDate: string;
  phone: string;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  status: 'Available' | 'Occupied' | 'Maintenance';
  patient?: string;
}

export interface Bill {
  id: string;
  patientName: string;
  date: string;
  insurance: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Rejected';
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  type: string;
  status: 'Available' | 'On Duty' | 'Maintenance';
  driverName: string;
  location: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
