"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { format } from "date-fns";
import * as XLSX from "xlsx";

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
  const prepareData = () => {
    return leads.map((lead) => ({
      Nome: lead.name,
      Email: lead.email,
      Telefone: lead.phone || "",
      Fonte: lead.source || "",
      Meio: lead.medium || "",
      Campanha: lead.campaign || "",
      IP: lead.ip_address || "",
      "Data de Captura": format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
    }));
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("Não há leads para exportar");
      return;
    }

    const data = prepareData();

    // CSV Headers
    const headers = Object.keys(data[0]);

    // CSV Rows
    const rows = data.map((row) => Object.values(row));

    // Build CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
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

  const exportToXLSX = () => {
    if (leads.length === 0) {
      alert("Não há leads para exportar");
      return;
    }

    const data = prepareData();

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    const columnWidths = [
      { wch: 25 }, // Nome
      { wch: 30 }, // Email
      { wch: 15 }, // Telefone
      { wch: 15 }, // Fonte
      { wch: 15 }, // Meio
      { wch: 20 }, // Campanha
      { wch: 15 }, // IP
      { wch: 18 }, // Data de Captura
    ];
    worksheet["!cols"] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Download file
    XLSX.writeFile(
      workbook,
      `leads_${format(new Date(), "yyyy-MM-dd_HH-mm")}.xlsx`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Leads
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2">
          <FileText className="w-4 h-4" />
          Exportar como CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToXLSX} className="gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Exportar como Excel (.xlsx)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
