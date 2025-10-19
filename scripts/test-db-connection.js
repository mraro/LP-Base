/**
 * Script para testar conexão com Supabase e verificar admins
 */

const { createClient } = require('@supabase/supabase-js');

// Carregar variáveis de ambiente manualmente do .env
const fs = require('fs');
const path = require('path');

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

async function testConnection() {
  console.log('\n🔍 Testando conexão com Supabase...\n');

  // Criar cliente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Buscar todos os admins
    const { data: admins, error } = await supabase
      .from('admins')
      .select('*');

    if (error) {
      console.error('❌ Erro ao buscar admins:', error.message);
      return;
    }

    console.log('✅ Conexão estabelecida!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 ADMINS CADASTRADOS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (admins.length === 0) {
      console.log('⚠️  Nenhum admin encontrado!');
      console.log('\n💡 Execute o SQL do script create-admin.js no Supabase SQL Editor');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Email: ${admin.email}`);
        console.log(`   Client ID: ${admin.client_id}`);
        console.log(`   Criado em: ${new Date(admin.created_at).toLocaleString('pt-BR')}`);
        console.log('');
      });
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

testConnection();
