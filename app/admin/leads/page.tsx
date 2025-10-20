import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, Calendar, Globe } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ExportLeadsButton from "../_components/export-leads-button";

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie todos os leads capturados pela landing page
          </p>
        </div>
        <ExportLeadsButton leads={leads} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Leads ({leads.length})</CardTitle>
          <CardDescription>
            Lista completa de todos os leads capturados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Nome</p>
                        <p className="font-semibold text-lg">{lead.name}</p>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>

                      {lead.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-primary transition-colors"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(lead.created_at), "dd/MM/yyyy 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>

                      {lead.source && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Origem</p>
                          <div className="flex flex-wrap gap-2">
                            {lead.source && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                Fonte: {lead.source}
                              </span>
                            )}
                            {lead.medium && (
                              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
                                Meio: {lead.medium}
                              </span>
                            )}
                            {lead.campaign && (
                              <span className="px-2 py-1 bg-accent/10 text-accent-foreground text-xs rounded-md">
                                Campanha: {lead.campaign}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {lead.ip_address && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="w-4 h-4" />
                          <span>IP: {lead.ip_address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                Nenhum lead capturado ainda
              </p>
              <p className="text-sm text-muted-foreground">
                Os leads aparecerão aqui quando alguém preencher o formulário
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
