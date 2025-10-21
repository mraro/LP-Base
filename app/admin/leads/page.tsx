import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExportLeadsButton from "../_components/export-leads-button";
import { LeadsTable } from "../_components/leads-table";

async function getLeads() {
  const supabase = createAdminClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }

  return leads || [];
}

export default async function LeadsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const leads = await getLeads();

  // Calcular estatísticas
  const totalLeads = leads.length;
  const leadsHoje = leads.filter((lead) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const leadDate = new Date(lead.created_at);
    return leadDate >= hoje;
  }).length;

  const fontes = leads.reduce((acc: Record<string, number>, lead) => {
    const fonte = lead.source || "direto";
    acc[fonte] = (acc[fonte] || 0) + 1;
    return acc;
  }, {});

  const fontePrincipal = Object.entries(fontes).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Leads</h1>
          <p className="text-white/80">
            {totalLeads} {totalLeads === 1 ? "lead capturado" : "leads capturados"}
          </p>
        </div>
        <ExportLeadsButton leads={leads} />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leads Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{leadsHoje}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Principal Fonte
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fontePrincipal ? (
              <div>
                <p className="text-2xl font-bold capitalize">{fontePrincipal[0]}</p>
                <p className="text-sm text-muted-foreground">{fontePrincipal[1]} leads</p>
              </div>
            ) : (
              <p className="text-2xl font-bold">-</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Leads */}
      {leads.length > 0 ? (
        <LeadsTable leads={leads} />
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">
              Nenhum lead capturado ainda
            </p>
            <p className="text-sm text-muted-foreground">
              Os leads aparecerão aqui quando alguém preencher o formulário
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
