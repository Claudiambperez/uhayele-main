
export type Specialization = {
  id: string;
  name: string;
  description: string;
};

export type Doctor = {
  serialNumber: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  description: string;
  speciality: Specialization[];
  avatar?: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availability: string;
};

export const speciality: Specialization[] = [
  {
    id: "1",
    name: "Clínico Geral",
    description: "Médico de cuidados primários para consultas gerais e diagnósticos iniciais",
  },
  {
    id: "2",
    name: "Cardiologia",
    description: "Especialista em doenças do coração e sistema cardiovascular",
  },
  {
    id: "3",
    name: "Pediatria",
    description: "Cuidados médicos para bebês, crianças e adolescentes",
  },
  {
    id: "4",
    name: "Ginecologia",
    description: "Saúde da mulher, gravidez e sistema reprodutivo feminino",
  },
  {
    id: "5",
    name: "Dermatologia",
    description: "Tratamento de doenças da pele, cabelo e unhas",
  },
  {
    id: "6",
    name: "Ortopedia",
    description: "Especialista em ossos, articulações e sistema musculoesquelético",
  },
  {
    id: "7",
    name: "Oftalmologia",
    description: "Cuidados com a saúde dos olhos e visão",
  },
  {
    id: "8",
    name: "Psiquiatria",
    description: "Tratamento de transtornos mentais e emocionais",
  },
  {
    id: "9",
    name: "Neurologia",
    description: "Doenças do sistema nervoso e cérebro",
  },
  {
    id: "10",
    name: "Endocrinologia",
    description: "Distúrbios hormonais, diabetes e metabolismo",
  },
];

export const mockDoctors: Doctor[] = [
  {
    serialNumber: "DOC001",
    userId: "user-001",
    firstName: "João",
    lastName: "Mendes",
    email: "joao.mendes@clinica.ao",
    phone: "+244 923 456 789",
    yearsOfExperience: 15,
    description: "Médico experiente com especialização em medicina geral e cuidados preventivos. Atende pacientes de todas as idades com foco em diagnóstico preciso e tratamento humanizado.",
    speciality: [speciality[0]],
    rating: 4.8,
    reviewCount: 127,
    consultationFee: 15000,
    availability: "Seg-Sex: 08:00-17:00",
  },
  {
    serialNumber: "DOC002",
    userId: "user-002",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@cardio.ao",
    phone: "+244 924 567 890",
    yearsOfExperience: 12,
    description: "Cardiologista dedicada com vasta experiência no tratamento de hipertensão, arritmias e doenças coronárias. Formada na África do Sul com especialização em cardiologia intervencionista.",
    speciality: [speciality[1]],
    rating: 4.9,
    reviewCount: 95,
    consultationFee: 25000,
    availability: "Ter-Sáb: 09:00-16:00",
  },
  {
    serialNumber: "DOC003",
    userId: "user-003",
    firstName: "Carlos",
    lastName: "Ferreira",
    email: "carlos.ferreira@pediatria.ao",
    phone: "+244 925 678 901",
    yearsOfExperience: 10,
    description: "Pediatra apaixonado por cuidar de crianças. Especialista em crescimento infantil, vacinação e doenças pediátricas comuns. Atendimento carinhoso e paciente com os pequenos.",
    speciality: [speciality[2]],
    rating: 4.7,
    reviewCount: 143,
    consultationFee: 18000,
    availability: "Seg-Sex: 10:00-18:00",
  },
  {
    serialNumber: "DOC004",
    userId: "user-004",
    firstName: "Ana",
    lastName: "Costa",
    email: "ana.costa@gineco.ao",
    phone: "+244 926 789 012",
    yearsOfExperience: 14,
    description: "Ginecologista e obstetra com formação em Portugal. Especializada em gravidez de alto risco, saúde reprodutiva feminina e cirurgias ginecológicas minimamente invasivas.",
    speciality: [speciality[3]],
    rating: 4.9,
    reviewCount: 156,
    consultationFee: 22000,
    availability: "Seg-Qui: 08:00-15:00",
  },
  {
    serialNumber: "DOC005",
    userId: "user-005",
    firstName: "Pedro",
    lastName: "Lopes",
    email: "pedro.lopes@dermato.ao",
    phone: "+244 927 890 123",
    yearsOfExperience: 8,
    description: "Dermatologista especializado em tratamentos estéticos e dermatologia clínica. Experiência com acne, psoríase, eczema e procedimentos a laser.",
    speciality: [speciality[4]],
    rating: 4.6,
    reviewCount: 78,
    consultationFee: 20000,
    availability: "Ter-Sáb: 11:00-19:00",
  },
  {
    serialNumber: "DOC006",
    userId: "user-006",
    firstName: "Isabel",
    lastName: "Sousa",
    email: "isabel.sousa@ortho.ao",
    phone: "+244 928 901 234",
    yearsOfExperience: 16,
    description: "Ortopedista com especialização em cirurgia de joelho e quadril. Tratamento de lesões esportivas, fraturas e problemas articulares. Atende atletas e pacientes em reabilitação.",
    speciality: [speciality[5]],
    rating: 4.8,
    reviewCount: 112,
    consultationFee: 24000,
    availability: "Seg-Qua: 07:00-14:00",
  },
  {
    serialNumber: "DOC007",
    userId: "user-007",
    firstName: "André",
    lastName: "Martins",
    email: "andre.martins@oftalmo.ao",
    phone: "+244 929 012 345",
    yearsOfExperience: 11,
    description: "Oftalmologista com experiência em cirurgia de catarata, glaucoma e correção de miopia. Utiliza tecnologia de ponta para diagnóstico preciso de problemas visuais.",
    speciality: [speciality[6]],
    rating: 4.7,
    reviewCount: 89,
    consultationFee: 21000,
    availability: "Seg-Sex: 09:00-17:00",
  },
  {
    serialNumber: "DOC008",
    userId: "user-008",
    firstName: "Beatriz",
    lastName: "Rodrigues",
    email: "beatriz.rodrigues@psiq.ao",
    phone: "+244 930 123 456",
    yearsOfExperience: 13,
    description: "Psiquiatra com abordagem integrativa no tratamento de depressão, ansiedade e transtornos de humor. Oferece psicoterapia e gestão medicamentosa quando necessário.",
    speciality: [speciality[7]],
    rating: 4.9,
    reviewCount: 134,
    consultationFee: 23000,
    availability: "Ter-Sáb: 10:00-18:00",
  },
  {
    serialNumber: "DOC009",
    userId: "user-009",
    firstName: "Miguel",
    lastName: "Alves",
    email: "miguel.alves@neuro.ao",
    phone: "+244 931 234 567",
    yearsOfExperience: 18,
    description: "Neurologista sênior especializado em epilepsia, AVC, Parkinson e cefaleia. Formação internacional com experiência em centros médicos de excelência.",
    speciality: [speciality[8]],
    rating: 4.8,
    reviewCount: 98,
    consultationFee: 26000,
    availability: "Seg-Qui: 08:00-16:00",
  },
  {
    serialNumber: "DOC010",
    userId: "user-010",
    firstName: "Sofia",
    lastName: "Fernandes",
    email: "sofia.fernandes@endo.ao",
    phone: "+244 932 345 678",
    yearsOfExperience: 9,
    description: "Endocrinologista focada em diabetes, obesidade e distúrbios da tireoide. Oferece planos de tratamento personalizados com acompanhamento nutricional integrado.",
    speciality: [speciality[9]],
    rating: 4.7,
    reviewCount: 67,
    consultationFee: 22000,
    availability: "Seg-Sex: 13:00-20:00",
  },
  {
    serialNumber: "DOC011",
    userId: "user-011",
    firstName: "Ricardo",
    lastName: "Nunes",
    email: "ricardo.nunes@clinica.ao",
    phone: "+244 933 456 789",
    yearsOfExperience: 7,
    description: "Clínico geral jovem e dinâmico, com foco em medicina preventiva e gestão de doenças crônicas. Atendimento acessível e comunicativo.",
    speciality: [speciality[0]],
    rating: 4.5,
    reviewCount: 54,
    consultationFee: 12000,
    availability: "Seg-Sex: 14:00-21:00",
  },
  {
    serialNumber: "DOC012",
    userId: "user-012",
    firstName: "Luísa",
    lastName: "Pereira",
    email: "luisa.pereira@cardio.ao",
    phone: "+244 934 567 890",
    yearsOfExperience: 20,
    description: "Cardiologista veterana com vasta experiência em medicina preventiva cardiovascular. Referência no tratamento de insuficiência cardíaca e cuidados pós-infarto.",
    speciality: [speciality[1]],
    rating: 5.0,
    reviewCount: 201,
    consultationFee: 28000,
    availability: "Seg-Qua: 08:00-13:00",
  },
];
