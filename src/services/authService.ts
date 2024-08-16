// Usado para hashing de senhas e comparação de senhas com os hashes armazenados.
import bcrypt from 'bcryptjs';
// Usado para gerar e verificar tokens JWT.
import jwt from 'jsonwebtoken';
// Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
// Esquema da tabela de usuários no banco de dados.
import { users } from '../db/schema';
// Variáveis de ambiente, como o segredo JWT
import { env } from '../config/env';

// Registrar um novo usuário
// Verifica se já existe um usuário com o email fornecido.
// Se não existir, a senha é hashada usando bcrypt.
// Um novo registro de usuário é criado no banco de dados.
// Retorna o usuário recém-criado.
export async function registerUser(email: string, phone: string, password: string, name: string) {
  // Verificar se o usuário já existe
  const existingUser = await db.select(users).where(users.email.eq(email)).get();
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o novo usuário
  const newUser = await db.insert(users).values({
    email,
    phone,
    password: hashedPassword,
    name,
  }).returning();

  return newUser;
}

// Autenticar um usuário (Login)
// Verifica se o usuário existe pelo email fornecido.
// Compara a senha fornecida com o hash armazenado no banco de dados usando bcrypt.
// Se a senha for válida, gera um token JWT com um tempo de expiração de 1 hora.
// Retorna o token JWT e os detalhes do usuário.

export async function loginUser(email: string, password: string) {
  // Verificar se o usuário existe
  const user = await db.select(users).where(users.email.eq(email)).get();
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verificar se a senha está correta
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user };
}

// Verificar o token JWT (opcional, para uso em middlewares ou outras funções de serviço)
// Verifica o token usando o segredo JWT.
// Se válido, retorna os dados decodificados do token.
// Se inválido, lança um erro.
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
