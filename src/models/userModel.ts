// db: Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
// users: Esquema da tabela de usuários no banco de dados.
import { users } from '../db/schema';
// bcrypt: Biblioteca usada para hashing e verificação de senhas.
import bcrypt from 'bcryptjs';

// Define a estrutura de um objeto usuário, especificando os tipos de cada campo. 
// Essa interface facilita o trabalho com os dados de usuário em outras partes do código.
export interface User {
  id: number;
  email: string;
  phone?: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: string;
  created_at: Date;
}

// Função para encontrar um usuário por ID
export async function findUserById(userId: number): Promise<User | null> {
  const user = await db.select(users)
    .where(users.id.eq(userId))
    .get();
  return user ? (user as User) : null;
}

// Função para encontrar um usuário por email
export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await db.select(users)
    .where(users.email.eq(email))
    .get();
  return user ? (user as User) : null;
}

// Função para criar um novo usuário
export async function createUser(userData: Partial<User>): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);

  const [newUser] = await db.insert(users)
    .values({
      ...userData,
      password: hashedPassword,
    })
    .returning();

  return newUser as User;
}

// Função para atualizar um usuário
export async function updateUser(userId: number, updatedData: Partial<User>): Promise<User | null> {
  const [updatedUser] = await db.update(users)
    .set(updatedData)
    .where(users.id.eq(userId))
    .returning();

  return updatedUser ? (updatedUser as User) : null;
}

// Função para excluir um usuário
export async function deleteUser(userId: number): Promise<void> {
  await db.delete(users)
    .where(users.id.eq(userId))
    .execute();
}

// Função para verificar a senha de um usuário
export async function verifyPassword(userId: number, password: string): Promise<boolean> {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
}
