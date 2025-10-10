import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { trackingConfig } from "@/config/tracking.config";

export default function TrackingSetupPage() {
  const hasMetaPixel = !!trackingConfig.metaPixelId;
  const hasGoogleAnalytics = !!trackingConfig.googleAnalyticsId;
  const hasGoogleAds =
    !!trackingConfig.googleAds.conversionId && !!trackingConfig.googleAds.conversionLabel;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Setup de Tracking</h1>
        <p className="text-muted-foreground">
          Informações para configurar suas plataformas de anúncios
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Meta Pixel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasMetaPixel ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Configurado</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-yellow-500 font-medium">Não configurado</span>
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
                  <span className="text-sm text-green-500 font-medium">Configurado</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-yellow-500 font-medium">Não configurado</span>
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
                  <span className="text-sm text-green-500 font-medium">Configurado</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-yellow-500 font-medium">Não configurado</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta Pixel Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Meta Pixel (Facebook Ads)
          </CardTitle>
          <CardDescription>
            Configure o Meta Pixel para rastrear conversões do Facebook e Instagram Ads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Pixel ID:</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm">
              {trackingConfig.metaPixelId || "Não configurado"}
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Eventos Implementados:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>PageView - Visualização de página</li>
              <li>Lead - Quando o formulário é enviado</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Como Configurar:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Acesse o Meta Events Manager</li>
              <li>Selecione seu Pixel</li>
              <li>Vá em Configurações {">"} Conversões</li>
              <li>O evento "Lead" já está sendo enviado automaticamente</li>
              <li>Configure regras de conversão conforme necessário</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Google Analytics 4
          </CardTitle>
          <CardDescription>
            Acompanhe o comportamento dos usuários e conversões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Measurement ID:</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm">
              {trackingConfig.googleAnalyticsId || "Não configurado"}
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Eventos Implementados:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>page_view - Visualizações de página automáticas</li>
              <li>generate_lead - Quando o formulário é enviado</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Como Visualizar:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Acesse o Google Analytics</li>
              <li>Vá em Relatórios {">"} Conversões</li>
              <li>Configure "generate_lead" como evento de conversão</li>
              <li>Visualize os dados em tempo real</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Google Ads Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Google Ads
          </CardTitle>
          <CardDescription>
            Rastreie conversões para otimizar suas campanhas do Google Ads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Conversion ID:</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm">
              {trackingConfig.googleAds.conversionId || "Não configurado"}
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Conversion Label:</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm">
              {trackingConfig.googleAds.conversionLabel || "Não configurado"}
            </code>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Como Configurar:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Acesse o Google Ads</li>
              <li>Vá em Ferramentas {">"} Conversões</li>
              <li>As conversões serão rastreadas automaticamente quando configuradas</li>
              <li>Vincule com o Google Analytics para dados completos</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* UTM Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros UTM</CardTitle>
          <CardDescription>
            Use estes parâmetros nas suas URLs de campanha para rastreamento preciso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Exemplo de URL com UTM:</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm break-all">
              https://seusite.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento
            </code>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Parâmetros Capturados:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>utm_source - Fonte do tráfego (facebook, google, instagram, etc)</li>
              <li>utm_medium - Tipo de mídia (cpc, organic, social, email, etc)</li>
              <li>utm_campaign - Nome da campanha</li>
              <li>fbclid - Click ID do Facebook (automático)</li>
              <li>gclid - Click ID do Google (automático)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Instructions */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle>Como Adicionar/Alterar IDs de Tracking</CardTitle>
          <CardDescription>
            Para desenvolvedores: Configure os IDs no arquivo .env
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Variáveis de Ambiente (.env.local):</p>
            <code className="block p-4 bg-muted rounded-md font-mono text-sm whitespace-pre">
              {`NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id_aqui
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=xxxxx
NEXT_PUBLIC_CLIENT_ID=default`}
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            Após alterar as variáveis, reinicie o servidor de desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
