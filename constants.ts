import { 
  Member, Project, ChartData, StatData, Department, PermissionRole, FileItem, SystemLog, OrgNode,
  Appointment, Doctor, Staff, Patient, Room, Bill, Ambulance, Notification
} from './types';

// Images
export const USER_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8UwOMWiqYzATE1DrsmdzXU5dDIkJFPvFac1YZH9j4KyvnjBHDZTrEd4ISwBtUhtPQZEqXoh4vvs90ECe_wu5gBx6pJvXECl4TFbvnISQZDCjWK2JsjV_GIf3MTiMxs5N7T2oHS3otTGv_zOTJSqtVQngOw1UIdA9dt1IpRIqpNu2Z9yQawPFxGqctKXdj5vHPR-HqWrq9vtt83VTMwbyOl0_b25brVqD4LJJcpXfwj6cfnrmp_esUXuUG9fw7cQd2pizRMjJh8Ss";
const IMG_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ27CWpakDDWDllKIGDn0VR78GnqDL_1ukJK3cdub4pswFPsTMz-rLCvSR7S16Cj4jzgSurUtd6UErmjN-OuigK4I3pKsrELLQIXD1rNWddFV1QVZZbjd6AElGRiM_wClGx_sQP2XQO_iRMI_Y9XGxBJFtplNwC0Qlx6wsDbEQ0KKK5-EQOP04-L5Jw81fX4CA8DIqy5royTnunXMWzX1oQA1J5D6bmhAuHRJlKiBnrrZuA48nlkZFmh-sAKgWkoicCtSs92i19xo";
const IMG_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAxa-V5Q2zrFd8F-g68U9cVDGnVYymajSjBx1Uu1B34AA9SQzcFmVwpb7T94iYDz5bDWcyNl4oDYukAvR444JWuH_VjnhQHlqQDRyZzbVYepMxa339gRgbk5QG99HDMp5vHxzyFgxhMEOtZA7RS6MPJOh-I06ScY01Mameq8sfVj4UZuvJiPA2BXsOK789e7w2WMrFu-TvUN6-r_fmm8SZKtj8wsqa1p72gxhQVQiE_nbwcnOabJql7G8OxSbo8myHATXIGIS-bYjU";
const IMG_3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuC0apM_ZmDy_kg7Kh9iu8Mc_e0pyKQSx3ZO7lhV71Fo1Hi8geMejiaKDPW1USCHn3JcUnNFHMuAd8xp48m8O7v0OL60IZOkOayPwi6jwrub52IW5tK3K9l-tnbxSQUCIT03Yt0NbfNk1OkiDkeGtuZpuS_LnPfOxPf36ik9vi2a3PhV4yZt90Ah8z13r6bO9ZDgG7H7VJrGQl9Kh2rUhobuZulNBgiJ7z9qeSeZqt1i6hibTvkq0m36JoBt2isFf5kfpm5ny7CaX3A";

// Dashboard Stats
export const statsData: StatData[] = [
  {
    title: "Total Projects",
    translationKey: "dashboard.total_projects",
    value: "42",
    trend: "+8",
    trendUp: true,
    data: [35, 38, 36, 40, 41, 39, 42],
    iconName: "briefcase",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Tasks",
    translationKey: "dashboard.active_tasks",
    value: "156",
    trend: "+24",
    trendUp: false,
    data: [120, 132, 140, 138, 150, 145, 156],
    iconName: "check-circle",
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Team Members",
    translationKey: "dashboard.team_members",
    value: "86",
    trend: "+3",
    trendUp: true,
    data: [80, 81, 82, 82, 84, 85, 86],
    iconName: "users",
    color: "bg-purple-100 text-purple-500",
  },
  {
    title: "Budget Usage",
    translationKey: "dashboard.budget_usage",
    value: "$420k",
    trend: "-5%",
    trendUp: true, 
    data: [450, 440, 435, 430, 425, 422, 420],
    iconName: "pie-chart",
    color: "bg-green-100 text-green-600",
  },
];

export const velocityData: ChartData[] = [
  { name: "Wk 1", value1: 45, value2: 30 },
  { name: "Wk 2", value1: 52, value2: 35 },
  { name: "Wk 3", value1: 48, value2: 40 },
  { name: "Wk 4", value1: 60, value2: 45 },
  { name: "Wk 5", value1: 55, value2: 50 },
  { name: "Wk 6", value1: 65, value2: 55 },
  { name: "Wk 7", value1: 58, value2: 48 },
];

export const taskDistributionData: ChartData[] = [
  { name: "Mon", value1: 15, value2: 20, value3: 5 },
  { name: "Tue", value1: 18, value2: 25, value3: 8 },
  { name: "Wed", value1: 20, value2: 22, value3: 10 },
  { name: "Thu", value1: 15, value2: 30, value3: 6 },
  { name: "Fri", value1: 12, value2: 28, value3: 12 },
  { name: "Sat", value1: 5, value2: 10, value3: 2 },
  { name: "Sun", value1: 2, value2: 5, value3: 1 },
];

export const members: Member[] = [
  { id: "1", name: "Sarah Connor", role: "Product Manager", department: "Product", status: "Active", image: IMG_1, email: "sarah.c@plm.com" },
  { id: "2", name: "John Smith", role: "Lead Developer", department: "Engineering", status: "Active", image: IMG_2, email: "john.s@plm.com" },
  { id: "3", name: "Emily Blunt", role: "UI Designer", department: "Design", status: "On Leave", image: IMG_3, email: "emily.b@plm.com" },
  { id: "4", name: "Mike Ross", role: "Legal Counsel", department: "Legal", status: "Active", image: USER_IMAGE, email: "mike.r@plm.com" },
];

export const projects: Project[] = [
  {
    id: "PROJ-101",
    name: "Q3 Marketing Campaign",
    manager: members[0],
    deadline: "2023-09-30",
    status: "In Progress",
    progress: 65,
    priority: "High",
    budget: "$50,000"
  },
  {
    id: "PROJ-102",
    name: "Mobile App Refactor",
    manager: members[1],
    deadline: "2023-11-15",
    status: "Delayed",
    progress: 30,
    priority: "High",
    budget: "$120,000"
  },
  {
    id: "PROJ-103",
    name: "Website Redesign",
    manager: members[2],
    deadline: "2023-08-01",
    status: "Completed",
    progress: 100,
    priority: "Medium",
    budget: "$25,000"
  },
];

export const departments: Department[] = [
  { id: "DEPT-1", name: "Engineering", managerName: "John Smith", memberCount: 45, projectCount: 12, status: "Active", parentId: "BR-1" },
  { id: "DEPT-2", name: "Product Design", managerName: "Emily Blunt", memberCount: 18, projectCount: 5, status: "Active", parentId: "BR-1" },
  { id: "DEPT-3", name: "Marketing", managerName: "Don Draper", memberCount: 22, projectCount: 8, status: "Restructuring", parentId: "BR-2" },
  { id: "DEPT-4", name: "Human Resources", managerName: "Pam Beesly", memberCount: 8, projectCount: 2, status: "Active", parentId: "BR-1" },
];

export const orgTree: OrgNode = {
  id: "HQ",
  name: "Global HQ",
  type: "Company",
  children: [
    {
      id: "BR-1",
      name: "New York Branch",
      type: "Branch",
      children: [
        { id: "DEPT-1", name: "Engineering", type: "Department" },
        { id: "DEPT-2", name: "Product Design", type: "Department" },
        { id: "DEPT-4", name: "Human Resources", type: "Department" },
      ]
    },
    {
      id: "BR-2",
      name: "London Branch",
      type: "Branch",
      children: [
         { id: "DEPT-3", name: "Marketing", type: "Department" },
      ]
    }
  ]
};

export const permissionRoles: PermissionRole[] = [
  { id: "ROLE-1", roleName: "Super Admin", usersCount: 2, description: "Full system access including billing and security logs.", accessLevel: "Admin" },
  { id: "ROLE-2", roleName: "Project Manager", usersCount: 8, description: "Can create projects, assign members, and view all reports.", accessLevel: "Editor" },
  { id: "ROLE-3", roleName: "Developer", usersCount: 35, description: "Can view assigned projects and update task status.", accessLevel: "Viewer" },
];

export const filesData: FileItem[] = [
  { id: "F-1", name: "Documents", type: "FOLDER", size: "--", owner: "System", date: "Jan 01, 2023", parentId: "root" },
  { id: "F-2", name: "Images", type: "FOLDER", size: "--", owner: "System", date: "Jan 01, 2023", parentId: "root" },
  
  { id: "1", name: "Project_Specs_v2.pdf", type: "PDF", size: "2.4 MB", owner: "Sarah Connor", date: "Apr 18, 2023", parentId: "F-1" },
  { id: "2", name: "Q3_Financials.xls", type: "XLS", size: "45 MB", owner: "Finance Dept", date: "Apr 21, 2023", parentId: "root" },
  { id: "3", name: "Design_Assets.zip", type: "ZIP", size: "125 MB", owner: "Emily Blunt", date: "Apr 24, 2023", parentId: "F-2" },
  { id: "4", name: "Legal_Contract.doc", type: "DOC", size: "1.2 MB", owner: "Mike Ross", date: "Apr 15, 2023", parentId: "F-1" },
];

export const systemLogs: SystemLog[] = [
  { id: "LOG-1", action: "User Login", user: "Sarah Connor", module: "Auth", timestamp: "2023-04-25 09:00:01", status: "Success", ip: "192.168.1.1" },
  { id: "LOG-2", action: "Delete Project", user: "John Smith", module: "Projects", timestamp: "2023-04-25 10:30:15", status: "Warning", ip: "192.168.1.42" },
  { id: "LOG-3", action: "File Upload Failed", user: "Emily Blunt", module: "Files", timestamp: "2023-04-25 11:15:00", status: "Error", ip: "192.168.1.15" },
  { id: "LOG-4", action: "Update Permission", user: "Noah Arthur", module: "Admin", timestamp: "2023-04-25 14:20:00", status: "Success", ip: "192.168.1.100" },
];

// Healthcare/Hospital Data

export const appointments: Appointment[] = [
  { id: "APT-1", doctorName: "Dr. Sarah Smith", doctorImage: IMG_1, patientName: "James Doe", disease: "Flu", date: "2023-04-25", time: "10:00 AM", status: "Confirmed" },
  { id: "APT-2", doctorName: "Dr. John Doe", doctorImage: IMG_2, patientName: "Jane Smith", disease: "Checkup", date: "2023-04-26", time: "11:30 AM", status: "Pending" },
  { id: "APT-3", doctorName: "Dr. Emily Blunt", doctorImage: IMG_3, patientName: "Robert Johnson", disease: "Dental", date: "2023-04-27", time: "09:00 AM", status: "Confirmed" },
];

export const doctors: Doctor[] = [
  { id: "DOC-1", name: "Dr. Sarah Smith", specialty: "Cardiologist", status: "Available", image: IMG_1, email: "sarah.smith@hospital.com", phone: "+1 234 567 890" },
  { id: "DOC-2", name: "Dr. John Doe", specialty: "Neurologist", status: "In Surgery", image: IMG_2, email: "john.doe@hospital.com", phone: "+1 234 567 891" },
  { id: "DOC-3", name: "Dr. Emily Blunt", specialty: "Dentist", status: "Available", image: IMG_3, email: "emily.blunt@hospital.com", phone: "+1 234 567 892" },
];

export const staffData: Staff[] = [
  { id: "STF-1", name: "Alice Johnson", role: "Nurse", department: "Emergency", status: "Active", image: USER_IMAGE, email: "alice.j@hospital.com" },
  { id: "STF-2", name: "Bob Wilson", role: "Receptionist", department: "Front Desk", status: "Active", image: IMG_2, email: "bob.w@hospital.com" },
  { id: "STF-3", name: "Charlie Brown", role: "Lab Technician", department: "Laboratory", status: "Inactive", image: IMG_3, email: "charlie.b@hospital.com" },
];

export const patientsData: Patient[] = [
  { id: "PAT-1", name: "James Doe", image: IMG_2, status: "Admitted", age: 35, gender: "Male", diagnosis: "Severe Flu", admissionDate: "2023-04-20", phone: "+1 987 654 321" },
  { id: "PAT-2", name: "Jane Smith", image: IMG_3, status: "Discharged", age: 28, gender: "Female", diagnosis: "Routine Checkup", admissionDate: "2023-04-22", phone: "+1 987 654 322" },
  { id: "PAT-3", name: "Robert Johnson", image: USER_IMAGE, status: "Admitted", age: 45, gender: "Male", diagnosis: "Fracture", admissionDate: "2023-04-24", phone: "+1 987 654 323" },
];

export const roomsData: Room[] = [
  { id: "RM-101", number: "101", type: "General Ward", status: "Available" },
  { id: "RM-102", number: "102", type: "Private", status: "Occupied", patient: "James Doe" },
  { id: "RM-103", number: "103", type: "ICU", status: "Maintenance" },
  { id: "RM-104", number: "104", type: "Private", status: "Available" },
  { id: "RM-201", number: "201", type: "General Ward", status: "Occupied", patient: "Robert Johnson" },
];

export const billingData: Bill[] = [
  { id: "INV-001", patientName: "James Doe", date: "2023-04-25", insurance: "BlueCross", amount: "$1,200", status: "Pending" },
  { id: "INV-002", patientName: "Jane Smith", date: "2023-04-24", insurance: "Aetna", amount: "$150", status: "Paid" },
  { id: "INV-003", patientName: "Robert Johnson", date: "2023-04-23", insurance: "Medicare", amount: "$5,000", status: "Pending" },
];

export const ambulanceData: Ambulance[] = [
  { id: "AMB-1", vehicleNumber: "EMS-101", type: "ALS", status: "Available", driverName: "Mike Driver", location: "Hospital Base" },
  { id: "AMB-2", vehicleNumber: "EMS-102", type: "BLS", status: "On Duty", driverName: "Steve Wheel", location: "Downtown" },
  { id: "AMB-3", vehicleNumber: "EMS-103", type: "ALS", status: "Maintenance", driverName: "John Fix", location: "Workshop" },
];

export const notifications: Notification[] = [
  { id: '1', title: 'New Project Assigned', message: 'You have been assigned to "Q3 Marketing Campaign".', type: 'info', timestamp: '2 mins ago', read: false },
  { id: '2', title: 'Task Completed', message: 'John completed the "Homepage Design" task.', type: 'success', timestamp: '1 hour ago', read: false },
  { id: '3', title: 'System Alert', message: 'Server maintenance scheduled for tonight.', type: 'warning', timestamp: '4 hours ago', read: true },
  { id: '4', title: 'Access Denied', message: 'Failed login attempt detected from new IP.', type: 'error', timestamp: 'Yesterday', read: true },
];
