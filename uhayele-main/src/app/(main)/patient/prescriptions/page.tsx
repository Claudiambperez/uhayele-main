"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { 
  Pill, 
  Calendar, 
  Download, 
  User, 
  Search, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  doctorName: string;
  doctorSignature?: string;
  signedAt?: Date;
  isSigned: boolean;
  date: Date;
  appointmentType: string;
  description?: string;
  items: PrescriptionItem[];
  validUntil?: Date;
}

// Mock prescriptions from patient's perspective
const mockMyPrescriptions: Prescription[] = [
  {
    id: 'RX-001',
    doctorName: 'Dr. João Manuel Mendes',
    doctorSignature: "https://storage.uhayele.ao/signatures/dr-mendes-001.png",
    signedAt: new Date(2026, 3, 7, 14, 30),
    isSigned: true,
    date: new Date(2026, 3, 7),
    appointmentType: 'Consulta Geral',
    description: 'Tratamento de hipertensão arterial essencial',
    validUntil: new Date(2026, 6, 7),
    items: [
      { id: '1', name: 'Losartana 50mg', description: '1 comprimido de manhã', quantity: 30 },
      { id: '2', name: 'Hidroclorotiazida 25mg', description: '1 comprimido de manhã', quantity: 30 }
    ]
  },
  {
    id: 'RX-002',
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
    doctorName: 'Dr. João Manuel Mendes',
    isSigned: false,
    date: new Date(2026, 3, 4),
    appointmentType: 'Retorno',
    description: 'Gestão de dor lombar crónica',
    validUntil: new Date(2026, 4, 4),
    items: [
      { id: '1', name: 'Paracetamol 1000mg', description: '1 comprimido a cada 8 horas se necessário', quantity: 20 }
    ]
  },
];

export default function MyPrescriptions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredPrescriptions = useMemo(() => {
    return mockMyPrescriptions.filter(prescription =>
      prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prescription.description && prescription.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

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
      doc.line(20, 62, 190, 62);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("RECEITA MÉDICA", 105, 78, { align: "center" });

      doc.setFontSize(12);
      doc.text(`Receita Nº: ${prescription.id}`, 20, 95);
      doc.text(`Data: ${format(prescription.date, "dd/MM/yyyy", { locale: pt })}`, 20, 103);
      
      if (prescription.validUntil) {
        doc.text(`Válida até: ${format(prescription.validUntil, "dd/MM/yyyy", { locale: pt })}`, 20, 111);
      }

      // Doctor
      doc.setFont("helvetica", "bold");
      doc.text("MÉDICO:", 20, 130);
      doc.setFont("helvetica", "normal");
      doc.text(prescription.doctorName, 20, 140);

      // Medications Table
      const tableData = prescription.items.map(item => [
        item.name,
        item.description || '',
        item.quantity.toString()
      ]);

      autoTable(doc, {
        startY: 155,
        head: [['Medicamento', 'Posologia', 'Quantidade']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 8 },
        headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 75 },
          1: { cellWidth: 85 },
          2: { cellWidth: 25, halign: 'center' }
        }
      });

      const finalY = (doc as any).lastAutoTable.finalY + 25;

      // Signature
      if (prescription.isSigned && prescription.doctorSignature) {
        doc.setFontSize(10);
        doc.text("Assinatura Digital do Médico:", 20, finalY);
        try {
          doc.addImage(prescription.doctorSignature, 'PNG', 20, finalY + 8, 80, 35);
        } catch (e) {
          doc.text("[Assinatura Digital]", 20, finalY + 25);
        }
      } else {
        doc.setFontSize(10);
        doc.text("Esta receita ainda não foi assinada digitalmente.", 20, finalY);
      }

      // Footer
      doc.setFontSize(9);
      doc.text("Apresente esta receita na farmácia junto com o seu Bilhete de Identidade.", 20, finalY + 65);
      doc.text("UHayele Saúde - Cuide bem de si", 105, finalY + 78, { align: "center" });

      doc.save(`Receita_${prescription.id}.pdf`);

    } catch (error) {
      console.error("PDF Error:", error);
      alert("Erro ao gerar a receita em PDF. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border shadow-sm">
            <Pill className="w-6 h-6 textzinc-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Minhas Receitas</h1>
            <p className="text-zinc-600">Histórico de prescrições médicas</p>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Pesquisar por médico, medicamento ou número da receita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Prescriptions List */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Minhas Receitas ({filteredPrescriptions.length})
                  <span className="text-sm font-normal text-emerald-600">
                    {filteredPrescriptions.filter(p => p.isSigned).length} assinadas
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-[640px] overflow-y-auto">
                  {filteredPrescriptions.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      <Pill className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>Nenhuma receita encontrada</p>
                    </div>
                  ) : (
                    filteredPrescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        onClick={() => setSelectedPrescription(prescription)}
                        className={`border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer ${
                          selectedPrescription?.id === prescription.id 
                            ? "border-emerald-500 bg-emerald-50" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{prescription.doctorName}</h3>
                            <p className="text-sm text-zinc-600 mt-1">{prescription.appointmentType}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {format(prescription.date, "dd MMM yyyy", { locale: pt })}
                            </div>
                            {prescription.isSigned ? (
                              <div className="flex items-center gap-1 text-emerald-600 text-xs mt-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Assinada
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Pendente
                              </div>
                            )}
                          </div>
                        </div>

                        {prescription.description && (
                          <p className="text-sm text-zinc-600 mt-3 line-clamp-2">
                            {prescription.description}
                          </p>
                        )}

                        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Pill className="w-3.5 h-3.5" />
                            {prescription.items.length} medicamento(s)
                          </div>
                          {prescription.validUntil && (
                            <div>Válida até {format(prescription.validUntil, "dd/MM/yyyy", { locale: pt })}</div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Sidebar */}
          <div className="xl:col-span-1">
            {selectedPrescription ? (
              <Card className="border border-gray-200 shadow-sm  top-6 h-[660px] w-[360px] flex flex-col overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Detalhes da Receita</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPrescription(null)}>
                      Fechar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 overflow-y-auto  space-y-6">
                  <div>
                    <p className="text-zinc-500 text-sm">Médico</p>
                    <p className="font-semibold text-lg">{selectedPrescription.doctorName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-zinc-500">Data de Emissão</p>
                      <p className="font-medium">
                        {format(selectedPrescription.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                      </p>
                    </div>
                    {selectedPrescription.validUntil && (
                      <div>
                        <p className="text-zinc-500">Válida até</p>
                        <p className="font-medium">
                          {format(selectedPrescription.validUntil, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm mb-2">Medicamentos Prescritos</p>
                    <div className="space-y-3">
                      {selectedPrescription.items.map((item) => (
                        <div key={item.id} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-zinc-600 mt-1">{item.description}</div>
                          )}
                          <div className="text-xs text-zinc-500 mt-2">
                            Quantidade: <span className="font-medium">{item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPrescription.description && (
                    <div>
                      <p className="text-zinc-500 text-sm mb-1">Observações do Médico</p>
                      <p className="text-sm bg-zinc-50 p-4 rounded-2xl border">
                        {selectedPrescription.description}
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={() => downloadPrescription(selectedPrescription)}
                    disabled={isDownloading}
                    className="w-full h-12  bg-zinc-900 hover:bg-black"
                  >
                    {isDownloading ? (
                      "Gerando PDF..."
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Descarregar Receita PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[420px]  w-[360px] flex items-center justify-center text-center border-dashed">
                <div>
                  <Pill className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                  <p className="text-zinc-500">Selecione uma receita</p>
                  <p className="text-sm text-zinc-400 mt-1">Clique em qualquer item para ver detalhes</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}