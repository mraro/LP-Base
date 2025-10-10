/**
 * Script para criar um novo usuário admin
 *
 * USO:
 * node scripts/create-admin.js email@example.com senha123 client_id
 *
 * Exemplo:
 * node scripts/create-admin.js admin@cliente.com minhasenha123 cliente_xyz
 */

const bcrypt = require('bcryptjs');

// Validar argumentos
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Erro: Argumentos insuficientes\n');
  console.log('Uso correto:');
  console.log('  node scripts/create-admin.js EMAIL SENHA [CLIENT_ID]\n');
  console.log('Exemplos:');
  console.log('  node scripts/create-admin.js admin@cliente.com senha123');
  console.log('  node scripts/create-admin.js admin@cliente.com senha123 cliente_xyz\n');
  process.exit(1);
}

const email = args[0];
const password = args[1];
const clientId = args[2] || 'default';

// Validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Erro: E-mail inválido');
  process.exit(1);
}

// Validar senha
if (password.length < 6) {
  console.error('❌ Erro: A senha deve ter pelo menos 6 caracteres');
  process.exit(1);
}

console.log('\n🔐 Gerando hash da senha...');

// Gerar hash
const hash = bcrypt.hashSync(password, 10);

console.log('\n✅ Hash gerado com sucesso!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 COPIE E EXECUTE NO SUPABASE SQL EDITOR:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`INSERT INTO admins (email, password_hash, client_id)
VALUES (
  '${email}',
  '${hash}',
  '${clientId}'
);`);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n✅ Admin criado com sucesso!\n');
console.log('📧 E-mail:', email);
console.log('🔑 Senha:', password);
console.log('👤 Client ID:', clientId);
console.log('\n⚠️  IMPORTANTE: Guarde essas credenciais em local seguro!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔗 Acesse: http://localhost:3000/admin/login');
console.log('   (ou sua URL de produção)\n');
