// Mock Medical Records based on Prisma schema

export type BloodType = "APlus" | "AMinus" | "BPlus" | "BMinus" | "ABPlus" | "ABMinus" | "OPlus" | "OMinus";

export type Diseases = 
  | "Hypertension_I10"
  | "Diabetes_Mellitus_E11"
  | "Anxiety_Disorder_F41"
  | "Depression_F32"
  | "Asthma_J45"
  | "Cancer_C00_C96"
  | "Heart_Disease_I00_I99"
  | "Stroke_I60_I69"
  | "Chronic_Kidney_Disease_N18"
  | "Tuberculosis_A15_A19"
  | "HIV_B20_B24"
  | "Other";

export type Immunization = "ChickenPox" | "Hepatitis" | "Influenza" | "MMR" | "Pneumonia" | "Tetanus";

export type ImmunizationRecord = {
  id: string;
  immunizationType: Immunization;
  dateAdministered: string;
  dosage: string;
};

export type FamilyMedicalHistory = {
  id: string;
  disease: Diseases;
  relationship: string;
  notes?: string;
};

export type MedicalRecord = {
  id: string;
  doctorSerialNumber: string;
  doctorName: string;
  patientId: string;
  bloodType?: BloodType;
  allergies?: string;
  personalHistory?: string;
  diagnosis?: string;
  treatment?: string;
  virtualVisitDate?: string;
  doctorNotes?: string;
  familyHistory?: FamilyMedicalHistory;
  immunizations: ImmunizationRecord[];
};

export type AppointmentHistory = {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorSerialNumber: string;
  specialization: string;
  type: string;
  status: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  prescriptions?: {
    id: string;
    description: string;
    items: { name: string; dosage: string; quantity: number }[];
  }[];
  diagnosticTests?: {
    name: string;
    result?: string;
    status: string;
  }[];
};

export type PatientInfo = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address?: string;
};

// Mock Patient Data
export const mockPatient: PatientInfo = {
  id: "patient-001",
  userId: "user-patient-001",
  firstName: "Ana",
  lastName: "Silva",
  dateOfBirth: "1990-05-15",
  gender: "Feminino",
  email: "ana.silva@email.ao",
  phone: "+244 923 456 789",
  address: "Rua da Missão, Luanda, Angola",
};

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr-001",
    doctorSerialNumber: "DOC001",
    doctorName: "Dr. João Mendes",
    patientId: "patient-001",
    bloodType: "OPlus",
    allergies: "Penicilina, Amendoim",
    personalHistory: "Hipertensão diagnosticada em 2018. Diabetes tipo 2 desde 2020. Sem histórico de cirurgias.",
    diagnosis: "Hipertensão Arterial (I10), Diabetes Mellitus Tipo 2 (E11)",
    treatment: "Losartana 50mg 1x/dia, Metformina 850mg 2x/dia",
    virtualVisitDate: "2024-03-15T10:00:00",
    doctorNotes: "Paciente em acompanhamento regular. Pressão arterial controlada. Glicemia em níveis aceitáveis.",
    familyHistory: {
      id: "fh-001",
      disease: "Diabetes_Mellitus_E11",
      relationship: "Mãe",
      notes: "Mãe diagnosticada com diabetes aos 55 anos",
    },
    immunizations: [
      {
        id: "imm-001",
        immunizationType: "Influenza",
        dateAdministered: "2024-04-01",
        dosage: "0.5ml",
      },
      {
        id: "imm-002",
        immunizationType: "Tetanus",
        dateAdministered: "2023-06-10",
        dosage: "0.5ml",
      },
      {
        id: "imm-003",
        immunizationType: "Hepatitis",
        dateAdministered: "2022-01-20",
        dosage: "1.0ml",
      },
    ],
  },
  {
    id: "mr-002",
    doctorSerialNumber: "DOC002",
    doctorName: "Dra. Maria Santos",
    patientId: "patient-001",
    diagnosis: "Consulta de rotina - Cardiologia",
    treatment: "Manter medicação atual. Retornar em 3 meses.",
    virtualVisitDate: "2024-02-10T14:30:00",
    doctorNotes: "Ecocardiograma normal. Função cardíaca preservada. Paciente assintomática.",
    immunizations: [],
  },
];

// Mock Appointment History
export const mockAppointmentHistory: AppointmentHistory[] = [
  {
    id: "apt-001",
    date: "2024-03-15",
    time: "10:00",
    doctorName: "Dr. João Mendes",
    doctorSerialNumber: "DOC001",
    specialization: "Clínico Geral",
    type: "Seguimento",
    status: "Completo",
    diagnosis: "Hipertensão Arterial (I10), Diabetes Mellitus Tipo 2 (E11)",
    treatment: "Losartana 50mg 1x/dia, Metformina 850mg 2x/dia",
    notes: "Paciente em acompanhamento regular. Pressão arterial controlada.",
    prescriptions: [
      {
        id: "pres-001",
        description: "Receita de controle de hipertensão e diabetes",
        items: [
          { name: "Losartana", dosage: "50mg - 1x ao dia", quantity: 30 },
          { name: "Metformina", dosage: "850mg - 2x ao dia", quantity: 60 },
        ],
      },
    ],
  },
  {
    id: "apt-002",
    date: "2024-02-10",
    time: "14:30",
    doctorName: "Dra. Maria Santos",
    doctorSerialNumber: "DOC002",
    specialization: "Cardiologia",
    type: "Primeira_Consulta",
    status: "Completo",
    diagnosis: "Avaliação cardiológica - sem alterações",
    treatment: "Manter medicação atual",
    notes: "Ecocardiograma normal. Função cardíaca preservada.",
    diagnosticTests: [
      {
        name: "Ecocardiograma",
        result: "Normal - Função ventricular preservada. Sem valvulopatias.",
        status: "Completo",
      },
      {
        name: "ECG",
        result: "Ritmo sinusal regular. Sem alterações isquêmicas.",
        status: "Completo",
      },
    ],
  },
  {
    id: "apt-003",
    date: "2024-01-20",
    time: "09:00",
    doctorName: "Dr. Carlos Ferreira",
    doctorSerialNumber: "DOC003",
    specialization: "Clínico Geral",
    type: "Retorno",
    status: "Completo",
    diagnosis: "Controle glicêmico adequado",
    treatment: "Manter Metformina 850mg 2x/dia",
    notes: "HbA1c: 6.8%. Glicemia de jejum: 110mg/dL. Paciente aderente ao tratamento.",
    diagnosticTests: [
      {
        name: "Hemoglobina Glicada (HbA1c)",
        result: "6.8%",
        status: "Completo",
      },
      {
        name: "Glicemia em Jejum",
        result: "110 mg/dL",
        status: "Completo",
      },
    ],
  },
  {
    id: "apt-004",
    date: "2024-04-05",
    time: "11:00",
    doctorName: "Dr. João Mendes",
    doctorSerialNumber: "DOC001",
    specialization: "Clínico Geral",
    type: "Seguimento",
    status: "Scheduled",
    notes: "Consulta agendada para avaliação de rotina",
  },
];

// Helper function to get disease label
export const getDiseaseLabel = (disease: Diseases): string => {
  const labels: Record<Diseases, string> = {
    Hypertension_I10: "Hipertensão Arterial",
    Diabetes_Mellitus_E11: "Diabetes Mellitus Tipo 2",
    Anxiety_Disorder_F41: "Transtorno de Ansiedade",
    Depression_F32: "Depressão",
    Asthma_J45: "Asma",
    Cancer_C00_C96: "Câncer",
    Heart_Disease_I00_I99: "Doença Cardíaca",
    Stroke_I60_I69: "AVC",
    Chronic_Kidney_Disease_N18: "Doença Renal Crônica",
    Tuberculosis_A15_A19: "Tuberculose",
    HIV_B20_B24: "HIV/AIDS",
    Other: "Outro",
  };
  return labels[disease];
};

// Helper function to get blood type label
export const getBloodTypeLabel = (bloodType: BloodType): string => {
  const labels: Record<BloodType, string> = {
    APlus: "A+",
    AMinus: "A-",
    BPlus: "B+",
    BMinus: "B-",
    ABPlus: "AB+",
    ABMinus: "AB-",
    OPlus: "O+",
    OMinus: "O-",
  };
  return labels[bloodType];
};

// Helper function to get immunization label
export const getImmunizationLabel = (immunization: Immunization): string => {
  const labels: Record<Immunization, string> = {
    ChickenPox: "Varicela",
    Hepatitis: "Hepatite",
    Influenza: "Gripe",
    MMR: "Sarampo, Caxumba e Rubéola (MMR)",
    Pneumonia: "Pneumonia",
    Tetanus: "Tétano",
  };
  return labels[immunization];
};
