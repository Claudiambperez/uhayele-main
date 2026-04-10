"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  User, 
  Download, 
  FileText,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

// Mock data - Only Completed Payments + Angolan Context
const mockPayments = [
  {
    id: "1",
    patientName: "João Manuel",
    patientId: "P12345",
    amount: 45000,
    date: new Date(2026, 3, 7),
    status: "completed" as const,
    method: "Pagamento por Referência",
    appointmentType: "Consulta Geral",
    invoiceNumber: "FAT-2026-001",
    transactionId: "TXN-ABC123456",
    notes: "Pagamento processado com sucesso",
  },
  {
    id: "2",
    patientName: "Maria Clara Santos",
    patientId: "P12346",
    amount: 65000,
    date: new Date(2026, 3, 6),
    status: "completed" as const,
    method: "Pagamento por Referência",
    appointmentType: "Seguimento",
    invoiceNumber: "FAT-2026-002",
    notes: "Pagamento via Multicaixa",
  },
  {
    id: "3",
    patientName: "António Ferreira",
    patientId: "P12347",
    amount: 85000,
    date: new Date(2026, 3, 5),
    status: "completed" as const,
    method: "Pagamento por Referência",
    appointmentType: "Revisão de Exames",
    invoiceNumber: "FAT-2026-004",
    transactionId: "TXN-DEF789012",
  },
  {
    id: "4",
    patientName: "Isabel Costa",
    patientId: "P12348",
    amount: 125000,
    date: new Date(2026, 3, 4),
    status: "completed" as const,
    method: "Pagamento por Referência",
    appointmentType: "Consulta Inicial",
    invoiceNumber: "FAT-2026-005",
    notes: "Pagamento confirmado",
  },
];

export default function PaymentHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const completedPayments = mockPayments.filter(p => p.status === "completed");

  const filteredPayments = useMemo(() => {
    return completedPayments.filter(payment =>
      payment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);

  // DOWNLOAD INVOICE FUNCTION

  const downloadInvoice = async () => {
    if (!selectedPayment) return;

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

      // Line
      doc.setDrawColor(220);
      doc.line(20, 60, 190, 60);

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("FACTURA / RECIBO MÉDICO", 105, 78, { align: "center" });

      // Invoice Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Factura Nº: ${selectedPayment.invoiceNumber}`, 20, 98);
      doc.text(`Data: ${format(selectedPayment.date, "dd/MM/yyyy", { locale: pt })}`, 20, 108);
      doc.text(`Transação: ${selectedPayment.transactionId || "N/A"}`, 20, 118);

      // Patient Info
      doc.setFont("helvetica", "bold");
      doc.text("PACIENTE:", 20, 138);
      doc.setFont("helvetica", "normal");
      doc.text(selectedPayment.patientName, 20, 150);
      doc.text(`ID Paciente: ${selectedPayment.patientId}`, 20, 160);

      // Table
      autoTable(doc, {
        startY: 175,
        head: [["Serviço", "Duração", "Valor (Kz)"]],
        body: [[
          selectedPayment.appointmentType,
          "30 minutos",
          selectedPayment.amount.toLocaleString("pt-AO")
        ]],
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 10 },
        headStyles: { 
          fillColor: [34, 197, 94], 
          textColor: 255, 
          fontStyle: "bold",
          halign: "center"
        },
        columnStyles: { 
          0: { cellWidth: 80 },
          1: { cellWidth: 40, halign: "center" },
          2: { cellWidth: 50, halign: "right" }
        },
        margin: { left: 20, right: 20 }
      });

      // Total
      const finalY = (doc as any).lastAutoTable.finalY + 20;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL:", 105, finalY, { align: "center" });
      doc.setFontSize(20);
      doc.text(`${selectedPayment.amount.toLocaleString("pt-AO")} Kz`, 105, finalY + 12, { align: "center" });

      // Footer
      doc.setFontSize(10);
      doc.setDrawColor(200);
      doc.line(20, finalY + 35, 190, finalY + 35);
      doc.text("Obrigado pela confiança!", 105, finalY + 50, { align: "center" });
      doc.text("UHayele Saúde - Saúde Digital em Angola", 105, finalY + 60, { align: "center" });
      doc.text(`Método: ${selectedPayment.method}`, 105, finalY + 70, { align: "center" });

      // Save PDF
      doc.save(`Factura_${selectedPayment.invoiceNumber}.pdf`);

    } catch (error) {
      console.error("PDF Error:", error);
      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <DollarSign className="w-6 h-6 text-zinc-900" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Histórico de Pagamentos</h1>
              <p className="text-zinc-500 ">Pagamentos concluídos dos pacientes</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="border border-gray-200 mb-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Pesquisar por nome, ID ou número da factura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 rounded-2xl bg-white border-gray-200 focus:border-violet-300"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Payments List */}
          <div className="xl:col-span-8">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg normal-case font-semibold text-gray-900">
                    Pagamentos Concluídos ({filteredPayments.length})
                  </h2>
                  <div className="text-sm text-emerald-600 font-medium">
                    Total: {totalRevenue.toLocaleString("pt-AO")} Kz
                  </div>
                </div>

                <div className="space-y-3 max-h-[680px] overflow-y-auto pr-2">
                  {filteredPayments.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>Nenhum pagamento encontrado</p>
                    </div>
                  ) : (
                    filteredPayments.map((payment) => (
                      <div
                        key={payment.id}
                        onClick={() => setSelectedPayment(payment)}
                        className={`border rounded-2xl p-5 hover:shadow-sm transition-all cursor-pointer ${
                          selectedPayment?.id === payment.id 
                            ? "border-emerald-500 bg-emerald-50" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-100 rounded-2xl flex items-center justify-center">
                              <User className="w-5 h-5 text-zinc-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{payment.patientName}</h3>
                              <p className="text-sm text-zinc-500">{payment.patientId} • {payment.invoiceNumber}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                              {payment.amount.toLocaleString("pt-AO")} Kz
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                              {format(payment.date, "dd/MM/yyyy", { locale: pt })}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-zinc-600">{payment.method}</span>
                          <span className="text-emerald-600 font-medium">{payment.appointmentType}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
    
{/* Payment Details Sidebar */}
<div className="w-96 xl:col-span-4">
  {selectedPayment ? (
    <Card className="border border-gray-200 shadow-sm  top-6 h-[600px] flex flex-col overflow-hidden">
      {/* Header - fixed size */}
      <CardHeader className="border-b px-6 py-5 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold normal-case">Detalhes do Pagamento</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPayment(null)}
          >
            Fechar
          </Button>
        </div>
      </CardHeader>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Scrollable content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8 custom-scrollbar">
   
          {/* Details */}
          <div className="space-y-6 text-sm">
            <div className="flex justify-between gap-2">
     <div>
              <p className="text-zinc-500 mb-1">Paciente</p>
              <p className="font-medium">{selectedPayment.patientName}</p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">ID do Paciente</p>
              <p className="font-medium">{selectedPayment.patientId}</p>
            </div>
            </div>
       

            <div>
              <p className="text-zinc-500 mb-1">Tipo de Consulta</p>
              <p className="font-medium">{selectedPayment.appointmentType}</p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">Data</p>
              <p className="font-medium">
                {format(selectedPayment.date, "dd/MM/yyyy", { locale: pt })}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">Método de Pagamento</p>
              <p className="font-medium">{selectedPayment.method}</p>
            </div>
       {/* Amount */}
          <div className="text-center">
            <p className="text-sm text-zinc-500 mt-1">Valor Total</p>
             <div className="text-xl font-bold text-gray-900">
              {selectedPayment.amount.toLocaleString("pt-AO")} Kz
            </div>
          </div>

            {selectedPayment.notes && (
              <div>
                <p className="text-zinc-500 mb-2">Notas</p>
                <p className="text-sm text-zinc-700 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                  {selectedPayment.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Button always at the bottom */}
        <div className="p-6 pt-2 border-t flex-shrink-0 bg-white">
            <Button 
                      onClick={() => downloadInvoice()}
                      disabled={isDownloading}
                      className="w-full bg-zinc-900 hover:bg-black rounded-2xl h-12"
                    >
                      {isDownloading ? (
                        <>
                          <Download className="w-6 h-6 mr-3 animate-spin" />
                          Gerando Factura...
                        </>
                      ) : (
                        <>
                          <Download className="w-6 h-6 mr-3" />
                          Descarregar Factura PDF
                        </>
                      )}
                    </Button>
        </div>
      </div>
    </Card>
  ) : (
 
    <Card className="border border-gray-200 h-[420px] flex items-center justify-center text-center p-8">
      <div>
        <CreditCard className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
        <p className="text-zinc-500">Selecione um pagamento</p>
        <p className="text-xs text-zinc-400 mt-1">
          Clique em qualquer pagamento para ver detalhes
        </p>
      </div>
    </Card>
  )}
</div>
        </div>
      </div>
    </div>
  );
}

    
