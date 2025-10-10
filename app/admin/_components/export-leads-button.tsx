"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  ip_address: string | null;
  created_at: string;
}

interface ExportLeadsButtonProps {
  leads: Lead[];
}

export default function ExportLeadsButton({ leads }: ExportLeadsButtonProps) {
  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("Não há leads para exportar");
      return;
    }

    // CSV Headers
    const headers = [
      "Nome",
      "Email",
      "Telefone",
      "Mensagem",
      "Fonte",
      "Meio",
      "Campanha",
      "IP",
      "Data de Captura",
    ];

    // CSV Rows
    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone || "",
      lead.message || "",
      lead.source || "",
      lead.medium || "",
      lead.campaign || "",
      lead.ip_address || "",
      format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Add BOM for Excel UTF-8 support
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Download file
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leads_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={exportToCSV} className="gap-2">
      <Download className="w-4 h-4" />
      Exportar CSV
    </Button>
  );
}
