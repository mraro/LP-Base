# 📢 Guia de Campanhas - UTM e Tracking

Este guia mostra como usar a landing page com campanhas de tráfego pago.

---

## 🎯 Estrutura de URLs com UTM

### Formato Básico

```
https://seusite.com.br?utm_source=FONTE&utm_medium=MEIO&utm_campaign=CAMPANHA
```

### Parâmetros UTM

| Parâmetro | Descrição | Exemplos |
|-----------|-----------|----------|
| `utm_source` | Origem do tráfego | facebook, google, instagram, linkedin |
| `utm_medium` | Tipo de mídia | cpc, social, email, organic, referral |
| `utm_campaign` | Nome da campanha | lancamento, black-friday, webinar |
| `utm_content` | Variação do anúncio | video-a, imagem-b, carousel |
| `utm_term` | Palavras-chave | advogado+sp, consultor (Google Ads) |

---

## 📱 Exemplos de Campanhas

### Facebook/Instagram Ads

#### Campanha de Lançamento
```
https://seusite.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento-produto&utm_content=video-01
```

#### Stories do Instagram
```
https://seusite.com.br?utm_source=instagram&utm_medium=story&utm_campaign=promocao-verao&utm_content=stories-01
```

#### Post Orgânico
```
https://seusite.com.br?utm_source=facebook&utm_medium=social&utm_campaign=post-organico&utm_content=carrossel-01
```

### Google Ads

#### Rede de Pesquisa
```
https://seusite.com.br?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-servicos&utm_term=consultor+marketing
```

#### Display
```
https://seusite.com.br?utm_source=google&utm_medium=display&utm_campaign=remarketing&utm_content=banner-300x250
```

#### YouTube
```
https://seusite.com.br?utm_source=youtube&utm_medium=video&utm_campaign=pre-roll&utm_content=video-15s
```

### LinkedIn Ads

```
https://seusite.com.br?utm_source=linkedin&utm_medium=cpc&utm_campaign=b2b-leads&utm_content=sponsored-post
```

### TikTok Ads

```
https://seusite.com.br?utm_source=tiktok&utm_medium=cpc&utm_campaign=viral-challenge&utm_content=video-vertical
```

### E-mail Marketing

```
https://seusite.com.br?utm_source=newsletter&utm_medium=email&utm_campaign=black-friday&utm_content=banner-topo
```

---

## 🛠️ Geradores de URL

### Gerador do Google
[Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)

### Passo a Passo

1. **Website URL:** `https://seusite.com.br`
2. **Campaign Source:** `facebook`
3. **Campaign Medium:** `cpc`
4. **Campaign Name:** `lancamento`
5. Clique em "Generate URL"

---

## 📊 Como Usar os Parâmetros

### No Meta Ads

1. Acesse o Gerenciador de Anúncios
2. Criar Anúncio > Tráfego
3. No campo **URL do site**, adicione:
   ```
   https://seusite.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
   ```

### No Google Ads

1. Acesse sua campanha
2. Configurações da campanha
3. Opções de URL > Sufixo de URL final:
   ```
   utm_source=google&utm_medium=cpc&utm_campaign={campaign}&utm_term={keyword}
   ```

---

## 🎯 Melhores Práticas

### Nomenclatura

#### ✅ BOM
```
utm_source=facebook
utm_medium=cpc
utm_campaign=lancamento-produto-2024
utm_content=video-testimonial
```

#### ❌ RUIM
```
utm_source=FB
utm_medium=paid
utm_campaign=Campanha 1
utm_content=teste
```

### Regras de Ouro

1. **Use minúsculas** - Evita duplicatas
2. **Sem espaços** - Use hífen ou underscore
3. **Seja consistente** - Mantenha padrão
4. **Seja descritivo** - Facilita análise
5. **Documente** - Mantenha planilha de campanhas

---

## 📋 Planilha de Controle

Mantenha uma planilha com suas campanhas:

| Campanha | Plataforma | URL Completa | Início | Status |
|----------|------------|--------------|--------|---------|
| Lançamento | Facebook | https://... | 01/03 | Ativa |
| Black Friday | Google | https://... | 20/11 | Planejada |

---

## 🔍 Rastreamento Automático

### Click IDs Capturados Automaticamente

#### Facebook (fbclid)
Quando alguém clica em um anúncio do Facebook/Instagram, a URL fica:
```
https://seusite.com.br?fbclid=IwAR1abc123...
```
✅ **Capturado automaticamente pelo sistema!**

#### Google (gclid)
Quando alguém clica em um anúncio do Google:
```
https://seusite.com.br?gclid=Cj0KCQ...
```
✅ **Capturado automaticamente pelo sistema!**

### O Que É Rastreado

Para cada lead capturado, o sistema salva:

- ✅ Nome, email, telefone, mensagem
- ✅ utm_source, utm_medium, utm_campaign
- ✅ fbclid (se veio do Facebook/Instagram)
- ✅ gclid (se veio do Google)
- ✅ IP address
- ✅ User agent (navegador)
- ✅ Data e hora exatos

---

## 📊 Análise de Resultados

### No Admin Panel

1. **Dashboard** - Visão geral
   - Total de leads
   - Leads por fonte
   - Tendências

2. **Leads** - Detalhes
   - Filtrar por fonte
   - Ver origem de cada lead
   - Exportar dados

### Visualizar no Admin

Quando você acessar um lead no admin, verá:

```
📧 Email: cliente@email.com
📱 Telefone: (11) 99999-9999
📍 Origem:
   Fonte: facebook
   Meio: cpc
   Campanha: lancamento-produto
🌐 IP: 123.456.789.0
📅 Data: 15/03/2024 às 14:30
```

---

## 🎯 Estratégias de Campanha

### Teste A/B

Compare diferentes abordagens:

#### Criativo A (Vídeo)
```
?utm_source=facebook&utm_campaign=teste&utm_content=video-a
```

#### Criativo B (Imagem)
```
?utm_source=facebook&utm_campaign=teste&utm_content=imagem-b
```

**Análise:** Veja no admin qual `utm_content` gerou mais leads.

### Funil Completo

#### Topo de Funil (Awareness)
```
?utm_source=facebook&utm_campaign=awareness&utm_content=video-educativo
```

#### Meio de Funil (Consideração)
```
?utm_source=facebook&utm_campaign=consideracao&utm_content=depoimentos
```

#### Fundo de Funil (Conversão)
```
?utm_source=facebook&utm_campaign=conversao&utm_content=oferta-especial
```

---

## 💰 Cálculo de ROI

### Exportar Leads

1. Admin > Leads
2. Clique em "Exportar CSV"
3. Abra no Excel/Google Sheets

### Calcular por Campanha

```
ROI = (Receita - Investimento) / Investimento × 100%
```

**Exemplo:**
- Investimento: R$ 500
- Leads gerados: 50
- Taxa de conversão: 10%
- Valor por cliente: R$ 500
- Receita: 5 clientes × R$ 500 = R$ 2.500

```
ROI = (2.500 - 500) / 500 × 100% = 400%
```

---

## 🔔 Notificações de Leads

### Webhook (Opcional)

Para receber notificações instantâneas, configure um webhook em `app/api/leads/route.ts`:

```typescript
// Enviar para Slack, Discord, Telegram, etc.
await fetch("SEU_WEBHOOK_URL", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: `Novo lead: ${data.name} - ${data.email}`,
    source: source || "Direto",
    campaign: campaign || "N/A",
  }),
});
```

---

## 📱 QR Codes

### Gerar QR Code com UTM

Use [QR Code Generator](https://www.qr-code-generator.com/) com:

```
https://seusite.com.br?utm_source=qrcode&utm_medium=offline&utm_campaign=evento-sp&utm_content=banner-entrada
```

**Casos de Uso:**
- Eventos
- Material impresso
- Cartões de visita
- Adesivos

---

## 🎬 Integrações

### Zapier

Conecte leads com:
- Google Sheets (planilha automática)
- CRM (Pipedrive, RD Station, HubSpot)
- WhatsApp Business
- E-mail (envio automático)

### Make (Integromat)

Automatize:
- Envio de e-mail de boas-vindas
- Adicionar em lista de remarketing
- Notificações personalizadas

---

## ✅ Checklist de Campanha

Antes de lançar uma campanha:

### Pré-lançamento
- [ ] URL com UTM criada e testada
- [ ] Tracking funcionando (Meta Pixel, GA4)
- [ ] Admin configurado
- [ ] Formulário testado
- [ ] Landing page otimizada

### Durante
- [ ] Monitorar leads diariamente
- [ ] Verificar origem dos leads
- [ ] Ajustar se necessário
- [ ] Responder leads rapidamente

### Pós-campanha
- [ ] Exportar dados
- [ ] Calcular ROI
- [ ] Analisar melhores fontes
- [ ] Documentar aprendizados

---

## 🚀 Dicas Pro

### 1. URL Curtas

Use um encurtador para URLs longas:
- [bit.ly](https://bit.ly)
- [tinyurl.com](https://tinyurl.com)

**Mantenha os UTMs!**

### 2. Teste Sempre

Antes de lançar, clique na URL e:
- Veja se abre a página correta
- Preencha o formulário
- Verifique se o lead aparece no admin
- Confirme se os UTMs foram capturados

### 3. Documente Tudo

Mantenha registro de:
- Todas as URLs criadas
- Datas de início/fim
- Investimento
- Resultados

### 4. Análise Regular

Pelo menos 1x por semana:
- Acesse o admin
- Veja novos leads
- Compare fontes
- Ajuste estratégia

---

## 📈 Métricas Importantes

### Calcule

- **CPL** (Custo por Lead) = Investimento ÷ Leads
- **Taxa de Conversão** = (Vendas ÷ Leads) × 100%
- **CAC** (Custo de Aquisição) = Investimento ÷ Vendas
- **ROI** = ((Receita - Investimento) ÷ Investimento) × 100%

### Benchmarks

| Métrica | Bom | Ótimo |
|---------|-----|-------|
| CPL | < R$ 50 | < R$ 20 |
| Taxa de Conversão | > 5% | > 10% |
| ROI | > 100% | > 300% |

*Varia muito por nicho!*

---

## 🎓 Recursos Adicionais

### Aprender Mais

- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Meta Blueprint](https://www.facebook.com/business/learn)
- [Google Ads Skillshop](https://skillshop.withgoogle.com/)

### Ferramentas Úteis

- **Análise:** Google Analytics, Hotjar
- **UTM:** Campaign URL Builder
- **Pixels:** Pixel Helper, Tag Assistant
- **A/B Test:** Google Optimize

---

## 💬 Suporte

Dúvidas sobre campanhas?

1. Consulte a documentação das plataformas
2. Teste em pequena escala primeiro
3. Analise os dados no admin
4. Itere e otimize

---

Boa sorte com suas campanhas! 🚀📈
