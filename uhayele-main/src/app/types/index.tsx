// types/index.ts  →  Frontend TypeScript types based on Prisma schema

// ======================
// ENUMS (Frontend versions)
// ======================
export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum AppointmentStatus {
  Scheduled = "Scheduled",
  Completed = "Completed",
  Cancelled = "Cancelled",
  NoShow = "NoShow",
  ReScheduled = "ReScheduled",
}

export enum DiagnosticTestStatus {
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export enum PaymentStatus {
  Pending = "Pending",
  Authorized = "Authorized",
  Failed = "Failed",
  Refunded = "Refunded",
}

export enum NotificationStatus {
  Pending = "Pending",
  Sent = "Sent",
  Failed = "Failed",
  Scheduled = "Scheduled",
}

export enum Allergy {
  Food = "Food",
  InsectBites = "InsectBites",
  Medicines = "Medicines",
  Plants = "Plants",
  Other = "Other",
}

export enum BloodType {
  APlus = "APlus",
  AMinus = "AMinus",
  BPlus = "BPlus",
  BMinus = "BMinus",
  ABPlus = "ABPlus",
  ABMinus = "ABMinus",
  OPlus = "OPlus",
  OMinus = "OMinus",
}

export enum Diseases {
  Addiction = "Addiction",
  Anemia = "Anemia",
  Arthritis = "Arthritis",
  Asthma = "Asthma",
  AutoImmuneDisorder = "AutoImmuneDisorder",
  BirthDefects = "BirthDefects",
  BladderIrritability = "BladderIrritability",
  BleedingDisorder = "BleedingDisorder",
  BloodClots = "BloodClots",
  BowelDisease = "BowelDisease",
  Cancer = "Cancer",
  Cataracts = "Cataracts",
  ChronicPain = "ChronicPain",
  ChickenPox = "ChickenPox",
  Depression = "Depression",
  Diabetes = "Diabetes",
  Gallstones = "Gallstones",
  Glaucoma = "Glaucoma",
  HeartDisease = "HeartDisease",
  HighBloodPressure = "HighBloodPressure",
  HighCholesterol = "HighCholesterol",
  HIV = "HIV",
  IrritableBowel = "IrritableBowel",
  KidneyDisease = "KidneyDisease",
  KidneyStones = "KidneyStones",
  LiverDisease = "LiverDisease",
  LungDisease = "LungDisease",
  Measles = "Measles",
  MentalIllness = "MentalIllness",
  Migraines = "Migraines",
  Mumps = "Mumps",
  Osteoporosis = "Osteoporosis",
  Other = "Other",
  Polio = "Polio",
  RecurrentUti = "RecurrentUti",
  RheumaticFever = "RheumaticFever",
  Seizures = "Seizures",
  SleepApnea = "SleepApnea",
  Stroke = "Stroke",
  TB = "TB",
  ThyroidProblems = "ThyroidProblems",
}

export enum Immunization {
  ChickenPox = "ChickenPox",
  Hepatitis = "Hepatitis",
  Influenza = "Influenza",
  MMR = "MMR",
  Pneumonia = "Pneumonia",
  Tetanus = "Tetanus",
}

// ======================
// MAIN TYPES
// ======================

export type User = {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;

  patient?: Patient | null;
  doctor?: Doctor | null;
  notifications?: Notification[];
};

export type Patient = {
  id: string;
  userId: string;
  dateOfBirth: Date;
  gender: string;
  email?: string;
  phone?: string;

  user: User;
  medicalRecords: MedicalRecord[];
  appointments: Appointment[];
  prescriptions: Prescription[];
};

export type Doctor = {
  serialNumber: string;
  userId: string;
  email?: string;
  phone?: string;
  
  // New fields
  yearsOfExperience?: number;
  description?: string;

  user: User;
  medicalRecords: MedicalRecord[];
  appointments: Appointment[];
  specialities: DoctorSpeciality[];
  prescriptions: Prescription[];
};

export type Specialization = {
  id: string;
  name: string;
  description?: string;
};

export type DoctorSpeciality = {
  doctorSerialNumber: string;
  specializationId: string;
  doctor: Doctor;
  specialization: Specialization;
};

export type Procedure = {
  id: string;
  name: string;
  description?: string;
  price?: number;
};

export type MedicalRecord = {
  id: string;
  doctorSerialNumber: string;
  patientId: string;
  bloodType?: BloodType;
  allergy?: Allergy;
  diagnosis?: string;
  treatment?: string;
  virtualVisitDate?: Date;
  doctorNotes?: string;

  doctor: Doctor;
  patient: Patient;
  familyHistory?: FamilyMedicalHistory;
  immunizations: Immunizations[];
};

export type FamilyMedicalHistory = {
  id: string;
  medicalRecordId: string;
  disease: Diseases;
};

export type Immunizations = {
  id: string;
  medicalRecordId: string;
  immunizationType: Immunization;
  dateAdministered: Date;
  dosage?: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorSerialNumber: string;
  dateTime: Date;
  status: AppointmentStatus;
  notes?: string;
  cost: number;
  platform?: string;

  patient: Patient;
  doctor: Doctor;
  diagnosticTests: DiagnosticTest[];
  payments: Payment[];
  prescriptions: Prescription[];
};

export type DiagnosticTest = {
  appointmentId: string;
  procedureId: string;
  result?: string;
  status: DiagnosticTestStatus;

  appointment: Appointment;
  procedure: Procedure;
};

export type Prescription = {
  id: string;
  doctorSerialNumber: string;
  patientId: string;
  appointmentId?: string;
  description?: string;

  doctor: Doctor;
  patient: Patient;
  appointment?: Appointment;
  items: PrescriptionItem[];
};

export type PrescriptionItem = {
  id: string;
  prescriptionId: string;
  name: string;
  description?: string;
  quantity: number;
  price?: number;
};

export type Payment = {
  id: string;
  appointmentId: string;
  amount: number;
  paymentDate: Date;
  method?: string;
  status: PaymentStatus;

  appointment: Appointment;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  sentDate?: Date;
  status: NotificationStatus;

  user: User;
};

// ======================
// Useful Combined / Form Types
// ======================

export type RoleCardType = {
  icon: React.ReactNode;
  role: UserRole;
  description: string;
};



// ======================
// AUTH TYPES
// ======================

// Login
export type LoginCredentials = {
  email: string;
  password: string; // You'll add this later when implementing auth
};

// Sign Up (Basic)
export type SignUpFormData = {
  firstName: string;    
  lastName: string;     // Changed from "nome" → better for backend
  email: string;
  password: string;
  confirmPassword: string;
};

// Full Registration (after role selection)
export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  // Extra fields depending on role
  dateOfBirth?: Date;   // only for PATIENT
  gender?: string;      // only for PATIENT
  phone?: string;
};

// For future API responses
export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
  token?: string;
};


// Role Selection Card (for FocusCards)
export type RoleSelectionCard = {
  key?: string;
  icon: React.ReactNode;
  role: UserRole;           // Must be the enum, not string
  title?: string;
  description: string;
};

// ======================
// ONBOARDING TYPES
// ======================

export type PatientOnboardingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "Masculino" | "Feminino" | "Outro";
};

export type DoctorOnboardingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serialNumber: string;
  yearsOfExperience?: number;      // Now real field
  description?: string;            // Now real field
  specialities: string[];
};