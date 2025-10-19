/**
 * Script para testar a query exata do NextAuth
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    process.env[key] = value;
  }
});

const EMAIL = 'admin@3scars.com';

async function testQuery() {
  console.log('\n🔍 Testando query exata do NextAuth...\n');
  console.log(`📧 Email: ${EMAIL}\n`);

  // Criar cliente com ANON KEY (como o NextAuth faz)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 Teste 1: Com ANON KEY (como NextAuth usa)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const supabaseAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    const { data: admin, error } = await supabaseAnon
      .from('admins')
      .select('*')
      .eq('email', EMAIL)
      .single();

    if (error) {
      console.log('❌ ERRO:', error.message);
      console.log('📋 Detalhes:', error);
    } else {
      console.log('✅ SUCESSO! Admin encontrado:');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Client ID: ${admin.client_id}`);
    }
  } catch (err) {
    console.error('❌ Exception:', err.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 Teste 2: Com SERVICE ROLE KEY (bypass RLS)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const supabaseService = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { data: admin, error } = await supabaseService
      .from('admins')
      .select('*')
      .eq('email', EMAIL)
      .single();

    if (error) {
      console.log('❌ ERRO:', error.message);
      console.log('📋 Detalhes:', error);
    } else {
      console.log('✅ SUCESSO! Admin encontrado:');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Client ID: ${admin.client_id}`);
    }
  } catch (err) {
    console.error('❌ Exception:', err.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 DIAGNÓSTICO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Se Teste 1 falhou e Teste 2 funcionou:');
  console.log('  → O problema é RLS (Row Level Security)');
  console.log('  → Solução: Usar SERVICE_ROLE_KEY no auth.config.ts\n');
  console.log('Se ambos falharam:');
  console.log('  → Problema na tabela ou dados\n');
  console.log('Se ambos funcionaram:');
  console.log('  → Problema pode ser na criação do cliente no código\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

testQuery();
