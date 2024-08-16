// Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
//Esquemas das tabelas de usuários e de seguidores/seguidos no banco de dados.
import { users, follows } from '../db/schema';

// Obter perfil de um usuário por ID
// Faz uma consulta ao banco de dados para obter os detalhes do usuário.
// Opcionalmente, também obtém contagens de seguidores e seguidos para fornecer informações adicionais.
// Retorna o perfil do usuário, incluindo essas informações adicionais.
export async function getUserProfile(userId: number) {
  const user = await db.select(users)
    .where(users.id.eq(userId))
    .get();

  if (!user) {
    throw new Error('User not found');
  }

  // Opcional: Você pode incluir informações adicionais, como contagem de seguidores e seguidos
  const followerCount = await db.select(follows)
    .where(follows.following_id.eq(userId))
    .count();

  const followingCount = await db.select(follows)
    .where(follows.follower_id.eq(userId))
    .count();

  return { ...user, followerCount, followingCount };
}

// Atualizar perfil de um usuário
//Verifica se o usuário existe.
// Atualiza o perfil do usuário no banco de dados com os dados fornecidos.
// Retorna o perfil atualizado.

export async function updateUserProfile(userId: number, updatedData: Partial<typeof users>) {
  const user = await db.select(users)
    .where(users.id.eq(userId))
    .get();

  if (!user) {
    throw new Error('User not found');
  }

  const [updatedUser] = await db.update(users)
    .set(updatedData)
    .where(users.id.eq(userId))
    .returning();

  return updatedUser;
}

// Seguir um usuário
// Verifica se o usuário já está seguindo o outro.
// Se não estiver, insere uma nova entrada na tabela follows para registrar a relação de seguimento.
// Retorna a nova relação de seguimento.
export async function followUser(followerId: number, followingId: number) {
  // Verifica se o usuário já está seguindo o outro
  const alreadyFollowing = await db.select(follows)
    .where(follows.follower_id.eq(followerId))
    .andWhere(follows.following_id.eq(followingId))
    .get();

  if (alreadyFollowing) {
    throw new Error('Already following this user');
  }

  // Cria a relação de seguir
  const [follow] = await db.insert(follows)
    .values({
      follower_id: followerId,
      following_id: followingId,
    })
    .returning();

  return follow;
}

// Deixar de seguir um usuário
// Verifica se o usuário está seguindo o outro.
// Se estiver, remove a entrada correspondente na tabela follows.
// Retorna uma mensagem de sucesso.
export async function unfollowUser(followerId: number, followingId: number) {
  // Verifica se o usuário está seguindo o outro
  const alreadyFollowing = await db.select(follows)
    .where(follows.follower_id.eq(followerId))
    .andWhere(follows.following_id.eq(followingId))
    .get();

  if (!alreadyFollowing) {
    throw new Error('Not following this user');
  }

  // Remove a relação de seguir
  await db.delete(follows)
    .where(follows.follower_id.eq(followerId))
    .andWhere(follows.following_id.eq(followingId))
}
