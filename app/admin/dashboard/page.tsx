import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Mail, Calendar } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

async function getStats() {
  const supabase = createAdminClient();

  // Total leads
  const { count: totalLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  // Leads today
  const today = new Date();
  const { count: leadsToday } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfDay(today).toISOString())
    .lte("created_at", endOfDay(today).toISOString());

  // Leads this week
  const weekAgo = subDays(today, 7);
  const { count: leadsThisWeek } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", weekAgo.toISOString());

  // Leads by source
  const { data: leadsBySource } = await supabase
    .from("leads")
    .select("source")
    .not("source", "is", null);

  const sourceCount: Record<string, number> = {};
  leadsBySource?.forEach((lead) => {
    const source = lead.source || "Direto";
    sourceCount[source] = (sourceCount[source] || 0) + 1;
  });

  // Recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    totalLeads: totalLeads || 0,
    leadsToday: leadsToday || 0,
    leadsThisWeek: leadsThisWeek || 0,
    leadsBySource: sourceCount,
    recentLeads: recentLeads || [],
  };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Dashboard</h1>
        <p className="text-white/80">
          Bem-vindo ao painel administrativo. Aqui você pode visualizar todas as métricas.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">Todos os leads capturados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsToday}</div>
            <p className="text-xs text-muted-foreground">Capturados nas últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsThisWeek}</div>
            <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalLeads > 0 ? "N/A" : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">Configure o tracking</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads by Source */}
      <Card>
        <CardHeader>
          <CardTitle>Leads por Fonte</CardTitle>
          <CardDescription>Distribuição de leads por origem de tráfego</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(stats.leadsBySource).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(stats.leadsBySource)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium">{source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {((count / stats.totalLeads) * 100).toFixed(1)}%
                      </span>
                      <span className="font-bold">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Nenhum lead com fonte definida ainda
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
          <CardDescription>Últimos 5 leads capturados</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentLeads.length > 0 ? (
            <div className="space-y-4">
              {stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    {lead.phone && (
                      <p className="text-sm text-muted-foreground">{lead.phone}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(lead.created_at), "HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Nenhum lead capturado ainda
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
