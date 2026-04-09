"use client";

import { useState, useRef } from 'react';
import { Search, User, Package, Plus, Trash2, ArrowLeft, FileText, Pill, Calendar, CheckCircle, Upload, PenTool, XCircle, Download } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import FileUploadDemo from '@/components/file-upload-demo';

interface PrescriptionItemForm {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

type SignatureType = 'none' | 'upload' | 'virtual';

interface Patient {
  id: string;
  name: string;
  userId: string;
  email?: string;
  phone?: string;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  type: string;                    // This will come from Prisma (Consulta_Geral, Seguimento, Retorno)
}

interface IssuePrescriptionProps {
  onBack: () => void;
  onPrescriptionCreated?: (prescription: any) => void;
}

// Mock data - Angolan context
const mockPatients: Patient[] = [
  { id: 'P12345', name: 'Maria dos Santos', userId: 'U001', email: 'maria.santos@email.ao', phone: '+244 923 456 789' },
  { id: 'P12346', name: 'António Francisco Oliveira', userId: 'U002', email: 'antonio.oliveira@email.ao', phone: '+244 923 123 456' },
  { id: 'P12347', name: 'Ana Paula Costa', userId: 'U003', email: 'ana.costa@email.ao', phone: '+244 912 345 678' },
  { id: 'P12348', name: 'Carlos Manuel Pereira', userId: 'U004', email: 'carlos.pereira@email.ao', phone: '+244 922 987 654' },
  { id: 'P12349', name: 'Isabel Mariana dos Santos', userId: 'U005', email: 'isabel.santos@email.ao', phone: '+244 924 567 890' },
];

const mockAppointments: Appointment[] = [
  { id: 'APT001', patientId: 'P12345', patientName: 'Maria dos Santos', date: new Date(2026, 3, 8), type: 'Consulta_Geral' },
  { id: 'APT002', patientId: 'P12346', patientName: 'António Francisco Oliveira', date: new Date(2026, 3, 8), type: 'Seguimento' },
  { id: 'APT003', patientId: 'P12347', patientName: 'Ana Paula Costa', date: new Date(2026, 3, 9), type: 'Retorno' },
];

const doctorInfo = {
  serialNumber: 'DR001',
  name: 'Dr. João Manuel Mendes',
  email: 'joao.mendes@uhayele.ao'
};

export default function IssuePrescription({ onBack, onPrescriptionCreated }: IssuePrescriptionProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<PrescriptionItemForm[]>([
    { id: '1', name: '', description: '', quantity: 1 }
  ]);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [generatedPrescription, setGeneratedPrescription] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // Signature states
  const [signatureType, setSignatureType] = useState<SignatureType>('none');
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const [virtualSignatureText, setVirtualSignatureText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(patientSearchQuery.toLowerCase())
  );

  const patientAppointments = selectedPatient
    ? mockAppointments.filter(apt => apt.patientId === selectedPatient.id)
    : [];

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', description: '', quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof PrescriptionItemForm, value: string | number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, signature: 'A imagem deve ter menos de 2MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedSignature(reader.result as string);
        setErrors({ ...errors, signature: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSignature = () => {
    setUploadedSignature(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedPatient) newErrors.patient = 'Selecione um paciente';
    if (!description.trim()) newErrors.description = 'Digite uma descrição para a receita';

    const hasValidItem = items.some(item => item.name.trim() !== '');
    if (!hasValidItem) newErrors.items = 'Adicione pelo menos um medicamento';

    items.forEach((item, index) => {
      if (item.name.trim() && item.quantity <= 0) {
        newErrors[`item-${index}-quantity`] = 'Quantidade deve ser maior que 0';
      }
    });

    if (signatureType === 'upload' && !uploadedSignature) {
      newErrors.signature = 'Faça o upload da assinatura';
    }
    if (signatureType === 'virtual' && !virtualSignatureText.trim()) {
      newErrors.signature = 'Digite sua assinatura virtual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePrescription = () => {
    if (!validateForm()) return;

    const validItems = items.filter(item => item.name.trim() !== '');

    let signatureData = null;
    let isSigned = false;
    let signedAt = null;
    let signedBy = null;

    if ((signatureType === 'upload' && uploadedSignature) || 
        (signatureType === 'virtual' && virtualSignatureText.trim())) {
      signatureData = signatureType === 'upload' ? uploadedSignature : virtualSignatureText.trim();
      isSigned = true;
      signedAt = new Date();
      signedBy = doctorInfo.serialNumber;
    }

    const prescription = {
      id: `RX-${Date.now().toString().slice(-6)}`,
      doctorSerialNumber: doctorInfo.serialNumber,
      doctorName: doctorInfo.name,
      patientId: selectedPatient!.id,
      patientName: selectedPatient!.name,
      appointmentId: selectedAppointment?.id || null,
      // Use selected appointment type or default to "Receita Avulsa"
      appointmentType: selectedAppointment?.type || 'Receita_Avulsa',
      description: description.trim(),
      date: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      doctorSignature: signatureData,
      isSigned,
      signedAt,
      signedBy,
      items: validItems.map((item, index) => ({
        id: `ITEM-${index + 1}`,
        name: item.name.trim(),
        description: item.description.trim(),
        quantity: item.quantity
      }))
    };

    setGeneratedPrescription(prescription);
    if (onPrescriptionCreated) onPrescriptionCreated(prescription);
  };

  // ==================== DOWNLOAD PDF FUNCTION ====================
  const downloadPrescriptionPDF = async (prescription: any) => {
    if (!prescription) return;
    setIsDownloading(true);

    try {
      const doc = new jsPDF();

      const logoBase64 = "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";   

      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 75, 15, 60, 25);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Clínica Médica Digital • Luanda, Angola", 105, 48, { align: "center" });
      doc.text("Tel: +244 222 456 789 | info@uhayele.ao", 105, 55, { align: "center" });

      doc.setDrawColor(200);
      doc.line(20, 65, 190, 65);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("RECEITA MÉDICA", 105, 80, { align: "center" });

      // Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Receita Nº: ${prescription.id}`, 20, 95);
      doc.text(`Data: ${format(prescription.date, "dd/MM/yyyy", { locale: pt })}`, 20, 103);
      doc.text(`Tipo: ${prescription.appointmentType}`, 20, 111);   // Shows Consulta_Geral, Seguimento or Retorno
      doc.text(`Válida até: ${format(prescription.validUntil, "dd/MM/yyyy", { locale: pt })}`, 20, 119);

      // Patient
      doc.setFont("helvetica", "bold");
      doc.text("PACIENTE:", 20, 135);
      doc.setFont("helvetica", "normal");
      doc.text(prescription.patientName, 20, 145);
      doc.text(`ID: ${prescription.patientId}`, 20, 153);

      // Doctor
      doc.setFont("helvetica", "bold");
      doc.text("MÉDICO:", 120, 135);
      doc.setFont("helvetica", "normal");
      doc.text(prescription.doctorName, 120, 145);

      // Medications Table
      const tableData = prescription.items.map((item: any) => [
        item.name,
        item.description || '',
        item.quantity.toString()
      ]);

      autoTable(doc, {
        startY: 170,
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

      const finalY = (doc as any).lastAutoTable.finalY + 25;

      // Signature
      if (prescription.isSigned && prescription.doctorSignature) {
        doc.setFontSize(10);
        doc.text("Assinatura Digital do Médico:", 20, finalY);

        if (signatureType === 'upload') {
          try {
            doc.addImage(prescription.doctorSignature, 'PNG', 20, finalY + 8, 70, 30);
          } catch (e) {
            doc.text("[Assinatura carregada]", 20, finalY + 20);
          }
        } else {
          doc.text(prescription.doctorSignature, 20, finalY + 20);
        }

        if (prescription.signedAt) {
          doc.setFontSize(9);
          doc.text(`Assinado em: ${format(prescription.signedAt, "dd/MM/yyyy 'às' HH:mm", { locale: pt })}`, 20, finalY + 45);
        }
      } else {
        doc.setFontSize(10);
        doc.text("Receita sem assinatura digital.", 20, finalY);
      }

      // Footer
      doc.setFontSize(10);
      doc.text("Esta receita é válida mediante apresentação do Bilhete de Identidade.", 20, finalY + 70);
      doc.text("UHayele Saúde - Luanda, Angola", 105, finalY + 80, { align: "center" });

      doc.save(`Receita_${prescription.id}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Erro ao gerar o PDF da receita.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setDescription('');
    setItems([{ id: '1', name: '', description: '', quantity: 1 }]);
    setGeneratedPrescription(null);
    setErrors({});
    setPatientSearchQuery('');
    setSignatureType('none');
    setUploadedSignature(null);
    setVirtualSignatureText('');
  };

  // ===================== SUCCESS SCREEN =====================
  if (generatedPrescription) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-semibold text-gray-900">Receita Gerada com Sucesso</h1>
              <p className="text-gray-500 mt-2">A prescrição foi criada e está pronta para uso.</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-8 bg-white mb-8">
              <div className="flex justify-between border-b pb-6 mb-6">
                <div>
                  <h2 className="text-sm font-semibold">{generatedPrescription.doctorName}</h2>
                  <p className="text-sm text-gray-600">Serial: {generatedPrescription.doctorSerialNumber}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">RECEITA MÉDICA</div>
                  <div className="text-sm text-gray-500">Nº {generatedPrescription.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs text-gray-500 mb-1">PACIENTE</p>
                  <p className="font-medium">{generatedPrescription.patientName}</p>
                  <p className="text-sm text-gray-600">{generatedPrescription.patientId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">TIPO DE CONSULTA</p>
                  <p className="font-medium">{generatedPrescription.appointmentType}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    Data: {format(generatedPrescription.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                  </p>
                </div>
              </div>

              {generatedPrescription.description && (
                <div className="mb-8">
                  <p className="text-xs text-gray-500 mb-2">DESCRIÇÃO / DIAGNÓSTICO</p>
                  <p className="text-gray-800">{generatedPrescription.description}</p>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs text-gray-500 mb-3">MEDICAMENTOS PRESCRITOS</p>
                <div className="space-y-4">
                  {generatedPrescription.items.map((item: any, index: number) => (
                    <div key={item.id} className="flex gap-4 border-l-4 border-gray-300 pl-4">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                        <p className="text-sm text-gray-500 mt-1">Quantidade: <span className="font-medium">{item.quantity}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {generatedPrescription.isSigned && (
                <div className="pt-6 border-t">
                  <p className="text-xs text-gray-500 mb-3">ASSINATURA DO MÉDICO</p>
                  {signatureType === 'upload' && generatedPrescription.doctorSignature ? (
                    <img src={generatedPrescription.doctorSignature} alt="Assinatura" className="h-20 border border-gray-200 rounded" />
                  ) : (
                    <p className="text-2xl italic text-gray-700">{generatedPrescription.doctorSignature}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-4">
                    Assinado por {generatedPrescription.signedBy} • {format(generatedPrescription.signedAt!, "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button onClick={handleReset} className="py-3.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Nova Receita</button>
              <button 
                onClick={() => downloadPrescriptionPDF(generatedPrescription)}
                disabled={isDownloading}
                className="py-3.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-black flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Download className="w-5 h-5" />
                {isDownloading ? "Gerando PDF..." : "Descarregar PDF"}
              </button>
                  <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== MAIN FORM =====================
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm w-[1000px] border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 p-3 rounded-xl">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Emitir Receita Médica</h1>
              <p className="text-gray-500">Preencha os dados para gerar uma nova prescrição</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-semibold mb-6">Dados da Receita</h2>

              {/* Patient Selection - (kept as is) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Paciente *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar paciente por nome ou ID..."
                    value={selectedPatient ? selectedPatient.name : patientSearchQuery}
                    onChange={(e) => {
                      setPatientSearchQuery(e.target.value);
                      setShowPatientSearch(true);
                      if (selectedPatient) setSelectedPatient(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.patient && <p className="text-red-500 text-xs mt-1.5">{errors.patient}</p>}

                {showPatientSearch && !selectedPatient && patientSearchQuery && (
                  <div className="mt-2 border border-gray-200 rounded-xl max-h-60 overflow-y-auto bg-white shadow">
                    {filteredPatients.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">Nenhum paciente encontrado</div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <button
                          key={patient.id}
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowPatientSearch(false);
                            setPatientSearchQuery('');
                            setErrors({ ...errors, patient: '' });
                          }}
                          className="w-full text-left p-4 hover:bg-zinc-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-500" />
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-gray-500">{patient.id}</div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {selectedPatient && (
                  <div className="mt-3 bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">{selectedPatient.name}</div>
                        <div className="text-sm text-gray-500">{selectedPatient.id}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedPatient(null)} className="text-red-600 text-sm hover:text-red-700">Remover</button>
                  </div>
                )}
              </div>

              {/* Appointment Selection (Optional) - YOUR REQUESTED CODE IMPLEMENTED */}
              {selectedPatient && patientAppointments.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Consulta Relacionada (Opcional)
                  </label>
                  <select
                    value={selectedAppointment?.id || ''}
                    onChange={(e) => {
                      const apt = patientAppointments.find(a => a.id === e.target.value);
                      setSelectedAppointment(apt || null);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  >
                    <option value="">Selecione uma consulta</option>
                    {patientAppointments.map((apt) => (
                      <option key={apt.id} value={apt.id}>
                        {format(apt.date, 'dd/MM/yyyy')} - {apt.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição / Diagnóstico *</label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors({ ...errors, description: '' });
                  }}
                  placeholder="Ex: Tratamento para hipertensão arterial..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>}
              </div>

              {/* Medications */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Medicamentos *</label>
                  <button onClick={addItem} className="text-sm text-zinc-600 hover:text-black flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Adicionar medicamento
                  </button>
                </div>
                {errors.items && <p className="text-red-500 text-xs mb-3">{errors.items}</p>}

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-5 bg-zinc-50">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium text-gray-700">Medicamento {index + 1}</span>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} className="text-red-600">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Nome do Medicamento *</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder="Ex: Losartana 50mg"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Posologia / Instruções</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Ex: 1 comprimido pela manhã"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Quantidade *</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                          />
                          {errors[`item-${index}-quantity`] && (
                            <p className="text-red-500 text-xs mt-1.5">{errors[`item-${index}-quantity`]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Assinatura da Receita</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {(['none', 'upload', 'virtual'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSignatureType(type);
                        setErrors({ ...errors, signature: '' });
                      }}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        signatureType === type ? 'border-zinc-900 bg-zinc-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {type === 'none' && <XCircle className="w-6 h-6 mx-auto mb-2 text-gray-400" />}
                      {type === 'upload' && <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />}
                      {type === 'virtual' && <PenTool className="w-6 h-6 mx-auto mb-2 text-gray-400" />}
                      <div className="text-sm font-medium capitalize">{type === 'none' ? 'Sem Assinatura' : type}</div>
                    </button>
                  ))}
                </div>

            {signatureType === 'upload' && (
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleSignatureUpload}
      className="hidden"
      id="signature-upload"
    />

    {uploadedSignature ? (
      <div className="space-y-4">
        <img 
          src={uploadedSignature} 
          alt="Assinatura do Médico" 
          className="max-h-32 mx-auto border border-gray-200 rounded-lg shadow-sm" 
        />
        <button 
          type="button"
          onClick={removeSignature}
          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
        >
          <Trash2 className="w-4 h-4" />
          Remover assinatura
        </button>
      </div>
    ) : (
      <label 
        htmlFor="signature-upload" 
        className="cursor-pointer block py-6 hover:bg-gray-50 rounded-xl transition-colors"
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-sm font-medium text-gray-700">Clique ou arraste a assinatura</p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG • Máximo 2MB</p>
      </label>
    )}
  </div>
)}

                {signatureType === 'virtual' && (
                  <input
                    type="text"
                    value={virtualSignatureText}
                    onChange={(e) => {
                      setVirtualSignatureText(e.target.value);
                      setErrors({ ...errors, signature: '' });
                    }}
                    placeholder="Digite seu nome completo"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                )}
                {errors.signature && <p className="text-red-500 text-xs mt-2">{errors.signature}</p>}
              </div>

              <button
                onClick={handleGeneratePrescription}
                className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-xl font-semibold transition-colors"
              >
                Gerar Receita
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6  top-6">
              <h3 className="font-semibold mb-4">Médico Responsável</h3>
              <div className="bg-zinc-50 p-4 rounded-xl border border-gray-200 ">
                <div className="font-medium">{doctorInfo.name}</div>
                <div className="text-sm text-gray-600">Serial: {doctorInfo.serialNumber}</div>
                <div className="text-sm text-gray-600 mt-1">{doctorInfo.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}