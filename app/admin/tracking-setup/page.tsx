import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { trackingConfig } from "@/config/tracking.config";

export default async function TrackingSetupPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Verificar se as variáveis de ambiente realmente existem (não strings vazias)
  const hasMetaPixel = trackingConfig.metaPixelId && trackingConfig.metaPixelId.trim() !== "";
  const hasGoogleAnalytics = trackingConfig.googleAnalyticsId && trackingConfig.googleAnalyticsId.trim() !== "";
  const hasGoogleAds =
    trackingConfig.googleAds.conversionId &&
    trackingConfig.googleAds.conversionId.trim() !== "" &&
    trackingConfig.googleAds.conversionLabel &&
    trackingConfig.googleAds.conversionLabel.trim() !== "";
  const hasMetaCapi = trackingConfig.metaCapi.enabled;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Setup de Tracking</h1>
        <p className="text-white/80">
          Informações para configurar suas campanhas de tráfego pago
        </p>
      </div>

      {/* Informações para Campanha */}
      <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="text-foreground">Informações da Campanha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL e Eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">URL da Landing Page</p>
              <code className="block p-3 bg-white dark:bg-gray-800 rounded-md font-mono text-sm text-foreground border">
                https://3s-cars.com.br
              </code>
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Evento de Conversão</p>
              <div className="space-y-2">
                <code className="block p-2 bg-white dark:bg-gray-800 rounded-md font-mono text-sm text-foreground border">
                  Meta: <strong>Lead</strong>
                </code>
                <code className="block p-2 bg-white dark:bg-gray-800 rounded-md font-mono text-sm text-foreground border">
                  Google: <strong>generate_lead</strong>
                </code>
              </div>
            </div>
          </div>

          {/* Tracking Ativo */}
          <div className="border-t border-blue-200 dark:border-blue-800 pt-4">
            <p className="text-sm font-medium mb-3 text-foreground">Tracking Ativo</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-foreground font-medium">Meta Pixel</div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-foreground font-medium">Meta CAPI</div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-foreground font-medium">Google Analytics</div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-foreground font-medium">Google Ads</div>
            </div>
          </div>

          {/* Dados Capturados */}
          <div className="border-t border-blue-200 dark:border-blue-800 pt-4">
            <p className="text-sm font-medium mb-2 text-foreground">Dados Capturados</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <code className="p-2 bg-white dark:bg-gray-800 rounded text-foreground border border-gray-300 dark:border-gray-700">name, email, phone</code>
              <code className="p-2 bg-white dark:bg-gray-800 rounded text-foreground border border-gray-300 dark:border-gray-700">utm_source, utm_medium, utm_campaign</code>
              <code className="p-2 bg-white dark:bg-gray-800 rounded text-foreground border border-gray-300 dark:border-gray-700">fbclid, gclid</code>
              <code className="p-2 bg-white dark:bg-gray-800 rounded text-foreground border border-gray-300 dark:border-gray-700">ip_address, user_agent</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Meta Pixel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasMetaPixel ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Ativo</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Inativo</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Meta CAPI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasMetaCapi ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Ativo</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Inativo</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Google Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasGoogleAnalytics ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Ativo</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Inativo</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Google Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasGoogleAds ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Ativo</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Inativo</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta Pixel Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Meta Pixel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Pixel ID</p>
            <code className="block p-3 bg-muted rounded-md font-mono text-sm">
              {hasMetaPixel ? trackingConfig.metaPixelId : "❌ Não configurado"}
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Evento</p>
            <code className="block p-3 bg-muted rounded-md font-mono text-sm">
              Lead
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Events Manager</p>
            <a
              href="https://business.facebook.com/events_manager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              business.facebook.com/events_manager
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Google Analytics 4</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Measurement ID</p>
            <code className="block p-3 bg-muted rounded-md font-mono text-sm">
              {hasGoogleAnalytics ? trackingConfig.googleAnalyticsId : "❌ Não configurado"}
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Evento</p>
            <code className="block p-3 bg-muted rounded-md font-mono text-sm">
              generate_lead
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Console</p>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              analytics.google.com
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Google Ads Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Google Ads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Conversion ID</p>
              <code className="block p-3 bg-muted rounded-md font-mono text-sm">
                {trackingConfig.googleAds.conversionId || "❌ Não configurado"}
              </code>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Conversion Label</p>
              <code className="block p-3 bg-muted rounded-md font-mono text-sm">
                {trackingConfig.googleAds.conversionLabel || "❌ Não configurado"}
              </code>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Console</p>
            <a
              href="https://ads.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              ads.google.com
            </a>
          </div>
        </CardContent>
      </Card>

      {/* UTM Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros UTM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Exemplo</p>
            <code className="block p-3 bg-muted rounded-md font-mono text-xs break-all">
              https://3s-cars.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign=detalhamento-jan-2025
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Parâmetros</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <code className="p-2 bg-muted/50 rounded">utm_source</code>
              <code className="p-2 bg-muted/50 rounded">utm_medium</code>
              <code className="p-2 bg-muted/50 rounded">utm_campaign</code>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Click IDs (automático)</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <code className="p-2 bg-muted/50 rounded">fbclid</code>
              <code className="p-2 bg-muted/50 rounded">gclid</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
