"use client";

import { useState } from 'react';
import { Search, User, FileText, Package, Calendar, Pill, Download, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PrescriptionItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;

}

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorSignature?: string  ;     // URL or base64 of doctor's signature
  signedAt?: Date;
  isSigned: boolean;
  date: Date;
  appointmentType: string;
  description?: string;
  items: PrescriptionItem[];
  validUntil?: Date;
}

// Mock prescriptions - Angolan context (updated)
const mockPrescriptions: Prescription[] = [
  {
    id: 'RX-001',
    patientName: 'Maria dos Santos',
    patientId: 'P12345',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: "https://storage.uhayele.ao/signatures/dr-mendes-001.png",
    signedAt: new Date(2026, 3, 7, 14, 30),
    isSigned: true,
    date: new Date(2026, 3, 7),
    appointmentType: 'Consulta Geral',
    description: 'Tratamento de hipertensão arterial essencial',

    validUntil: new Date(2026, 6, 7),
    items: [
      { id: '1', name: 'Losartana 50mg', description: '1 comprimido de manhã', quantity: 30},
      { id: '2', name: 'Hidroclorotiazida 25mg', description: '1 comprimido de manhã', quantity: 30 }
    ]
  },
  {
    id: 'RX-002',
    patientName: 'António Francisco Oliveira',
    patientId: 'P12346',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: "https://storage.uhayele.ao/signatures/dr-mendes-001.png",
    signedAt: new Date(2026, 3, 6, 10, 15),
    isSigned: true,
    date: new Date(2026, 3, 6),
    appointmentType: 'Seguimento',
    description: 'Controlo de diabetes mellitus tipo 2',

    validUntil: new Date(2026, 6, 6),
    items: [
      { id: '1', name: 'Metformina 850mg', description: '1 comprimido 2x ao dia após refeições', quantity: 60 }
    ]
  },
  {
    id: 'RX-003',
    patientName: 'Ana Paula Costa',
    patientId: 'P12347',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: "https://storage.uhayele.ao/signatures/dr-mendes-001.png",
    signedAt: new Date(2026, 3, 5, 16, 45),
    isSigned: true,
    date: new Date(2026, 3, 5),
    appointmentType: 'Consulta',
    description: 'Infecção respiratória aguda',
  
    validUntil: new Date(2026, 4, 5),
    items: [
      { id: '1', name: 'Amoxicilina 500mg', description: '1 comprimido 3x ao dia durante 7 dias', quantity: 21 }
    ]
  },
  {
    id: 'RX-004',
    patientName: 'Carlos Manuel Pereira',
    patientId: 'P12348',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: undefined,
    signedAt: undefined,
    isSigned: false,
    date: new Date(2026, 3, 4),
    appointmentType: 'Retorno',
    description: 'Gestão de dor lombar crónica',

    validUntil: new Date(2026, 4, 4),
    items: [
      { id: '1', name: 'Paracetamol 1000mg', description: '1 comprimido a cada 8 horas se necessário', quantity: 20 }
    ]
  },
  {
    id: 'RX-005',
    patientName: 'Isabel Mariana dos Santos',
    patientId: 'P12349',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: "https://storage.uhayele.ao/signatures/dr-mendes-001.png",
    signedAt: new Date(2026, 3, 3, 9, 20),
    isSigned: true,
    date: new Date(2026, 3, 3),
    appointmentType: 'Consulta Especializada',
    description: 'Controlo de ansiedade e insónia',

    validUntil: new Date(2026, 9, 3),
    items: [
      { id: '1', name: 'Sertralina 50mg', description: '1 comprimido à noite', quantity: 30 }
    ]
  }
];

export default function PrescriptionManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);

  const allPrescriptions = mockPrescriptions;
 
  const getFilteredPrescriptions = () => {
    let prescriptions = allPrescriptions;
 
    return prescriptions.filter(prescription =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredPrescriptions = getFilteredPrescriptions();

  // ==================== DOWNLOAD PDF FUNCTION (Updated) ====================
  const downloadPrescription = async (prescription: Prescription) => {
    if (!prescription) return;
    setIsDownloading(true);

    try {
      const doc = new jsPDF();


    const logoBase64 = "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";   

// Centered Logo
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 75, 15, 60, 25);   // centered
      }

      // Centered Clinic Info
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Clínica Médica Digital • Luanda, Angola", 105, 48, { align: "center" });
      doc.text("Tel: +244 222 456 789 | info@uhayele.ao", 105, 55, { align: "center" });

      doc.setDrawColor(200);
      doc.line(20, 65, 190, 65);

      // Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("RECEITA MÉDICA", 105, 80, { align: "center" });

      // Prescription Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Receita Nº: ${prescription.id}`, 20, 95);
      doc.text(`Data: ${format(prescription.date, "dd/MM/yyyy", { locale: pt })}`, 20, 103);
      doc.text(`Válida até: ${prescription.validUntil ? format(prescription.validUntil, "dd/MM/yyyy", { locale: pt }) : 'Não definida'}`, 20, 111);

      // Patient
      doc.setFont("helvetica", "bold");
      doc.text("PACIENTE:", 20, 130);
      doc.setFont("helvetica", "normal");
      doc.text(prescription.patientName, 20, 140);
      doc.text(`ID: ${prescription.patientId}`, 20, 148);

      // Doctor
      doc.setFont("helvetica", "bold");
      doc.text("MÉDICO:", 120, 130);
      doc.setFont("helvetica", "normal");
      doc.text(prescription.doctorName, 120, 140);

      // Medications Table (No Price, No Status)
      const tableData = prescription.items.map(item => [
        item.name,
        item.description || '',
        item.quantity.toString()
      ]);

      autoTable(doc, {
        startY: 165,
        head: [['Medicamento', 'Posologia', 'Quantidade']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 80 },
          2: { cellWidth: 25, halign: 'center' }
        }
      });

      // Signature Section
      const finalY = (doc as any).lastAutoTable.finalY + 20;

      if (prescription.isSigned && prescription.doctorSignature) {
        doc.setFontSize(10);
        doc.text("Assinatura Digital do Médico:", 20, finalY);

        try {
          doc.addImage(prescription.doctorSignature, 'PNG', 20, finalY + 8, 70, 30);
        } catch (e) {
          doc.text("[Assinatura Digital do Médico]", 20, finalY + 20);
        }

        if (prescription.signedAt) {
          doc.setFontSize(9);
          doc.text(`Assinado em: ${format(prescription.signedAt, "dd/MM/yyyy 'às' HH:mm", { locale: pt })}`, 20, finalY + 45);
        }
      } else {
        doc.setFontSize(10);
        doc.text("Esta receita ainda não foi assinada digitalmente.", 20, finalY);
      }

      // Footer
      doc.setFontSize(10);
      doc.text("Esta receita é válida mediante apresentação do Bilhete de Identidade.", 20, finalY + 70);
      doc.text("UHayele Saúde - Luanda, Angola", 105, finalY + 80, { align: "center" });

      doc.save(`Receita_${prescription.id}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Erro ao gerar a receita em PDF.");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Pill className="h-6 w-6 text-zinc-900" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Receitas Médicas</h1>
            <p className="text-sm text-zinc-500">Gerencie as prescrições dos pacientes</p>
          </div>
        </div>

        {/* Search */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Buscar por paciente, ID da receita ou medicamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-2xl bg-zinc-50 border-gray-200 focus:border-violet-300"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - List */}
          <div className="xl:col-span-2">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Todas as Receitas ({filteredPrescriptions.length})
                  </h2>
                </div>

                <div className="space-y-3 max-h-[680px] overflow-y-auto pr-2">
                  {filteredPrescriptions.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhuma receita encontrada</p>
                    </div>
                  ) : (
                    filteredPrescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        onClick={() => setSelectedPrescription(prescription)}
                        className={`border rounded-2xl p-4 hover:shadow-sm transition-all cursor-pointer ${
                          selectedPrescription?.id === prescription.id
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-zinc-100 p-2 rounded-xl">
                              <User className="w-4 h-4 text-zinc-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{prescription.patientName}</h3>
                              <p className="text-xs text-zinc-500">{prescription.patientId} • {prescription.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-zinc-500">
                              {format(prescription.date, 'dd/MM/yyyy', { locale: pt })}
                            </div>
                          </div>
                        </div>

                        {prescription.description && (
                          <div className="mt-3 text-xs text-zinc-600 line-clamp-2">
                            {prescription.description}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs">
                          <div className="flex items-center gap-1.5 text-zinc-600">
                            <Package className="w-3.5 h-3.5" />
                            {prescription.items.length} medicamento(s)
                          </div>
                          <span className="text-zinc-700 font-medium">{prescription.appointmentType}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="xl:col-span-1">
            {selectedPrescription ? (
              <Card className="border border-gray-200 shadow-sm  top-6 h-[660px] w-[360px] flex flex-col overflow-hidden">
                <CardHeader className="border-b px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Detalhes da Receita</h2>
                    <button
                      onClick={() => setSelectedPrescription(null)}
                      className="text-sm text-zinc-500 hover:text-zinc-700"
                    >
                      Fechar
                    </button>
                  </div>
                </CardHeader>

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  {/* Receipt ID */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                    <div className="text-xs text-zinc-500">Número da Receita</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">{selectedPrescription.id}</div>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="bg-zinc-100 p-2.5 rounded-xl">
                      <User className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedPrescription.patientName}</div>
                      <div className="text-sm text-zinc-500">{selectedPrescription.patientId}</div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-xs text-zinc-500">Médico</div>
                      <div className="font-medium">{selectedPrescription.doctorName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">Data de Emissão</div>
                      <div>{format(selectedPrescription.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}</div>
                    </div>
                    {selectedPrescription.validUntil && (
                      <div>
                        <div className="text-xs text-zinc-500">Válida até</div>
                        <div>{format(selectedPrescription.validUntil, "dd 'de' MMMM 'de' yyyy", { locale: pt })}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-zinc-500">Tipo de Consulta</div>
                      <div className="font-medium">{selectedPrescription.appointmentType}</div>
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <div className="text-xs text-zinc-500 mb-3">Medicamentos Prescritos</div>
                    <div className="space-y-3">
                      {selectedPrescription.items.map((item) => (
                        <div key={item.id} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                          <div className="font-medium">{item.name}</div>
                          {item.description && <div className="text-xs text-zinc-600 mt-1">{item.description}</div>}
                     
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t bg-white flex-shrink-0 space-y-2">
                  <button 
                    onClick={() => downloadPrescription(selectedPrescription)}
                    disabled={isDownloading}
                    className="w-full bg-zinc-900 hover:bg-black text-white flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium disabled:opacity-70"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Gerando PDF..." : "Descarregar Receita PDF"}
                  </button>

                </div>
              </Card>
            ) : (
              <Card className="border border-gray-200 h-[420px] w-[360px] flex items-center justify-center text-center">
                <div>
                  <Pill className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                  <p className="text-zinc-500">Selecione uma receita</p>
                  <p className="text-xs text-zinc-400 mt-1">Clique em qualquer receita para ver detalhes</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}