/**
 * Script para testar login de admin
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
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

// Credenciais para testar
const EMAIL = 'admin@3scars.com';
const PASSWORD = 'LmoCKPBbnLUjQsE2';

async function testLogin() {
  console.log('\n🔐 Testando login de admin...\n');
  console.log(`📧 Email: ${EMAIL}`);
  console.log(`🔑 Senha: ${PASSWORD}\n`);

  // Criar cliente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Buscar admin
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', EMAIL)
      .single();

    if (error) {
      console.error('❌ Erro ao buscar admin:', error.message);
      return;
    }

    if (!admin) {
      console.error('❌ Admin não encontrado!');
      return;
    }

    console.log('✅ Admin encontrado no banco!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 DADOS DO ADMIN:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`Email: ${admin.email}`);
    console.log(`Client ID: ${admin.client_id}`);
    console.log(`Hash: ${admin.password_hash.substring(0, 30)}...`);
    console.log('');

    // Testar senha
    console.log('🔍 Verificando senha...\n');
    const isValidPassword = await bcrypt.compare(PASSWORD, admin.password_hash);

    if (isValidPassword) {
      console.log('✅ ✅ ✅ SENHA CORRETA! ✅ ✅ ✅\n');
      console.log('🎉 O login deveria funcionar!\n');
      console.log('Se ainda não está funcionando, pode ser problema de:');
      console.log('  - Cache do NextAuth');
      console.log('  - Variáveis de ambiente não carregadas');
      console.log('  - Servidor Next.js precisa ser reiniciado\n');
    } else {
      console.log('❌ ❌ ❌ SENHA INCORRETA! ❌ ❌ ❌\n');
      console.log('O hash no banco não corresponde à senha fornecida.');
      console.log('Execute novamente o script create-admin.js e atualize no banco.\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

testLogin();
