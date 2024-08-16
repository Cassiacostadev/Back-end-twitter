// Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
// Esquemas das tabelas de curtidas e postagens no banco de dados.
import { likes, posts } from '../db/schema';

// Curtir uma postagem
// Verifica se o usuário já curtiu a postagem consultando o banco de dados.
// Se o usuário ainda não tiver curtido a postagem, insere uma nova entrada na tabela likes.
// Retorna a nova entrada de curtida.
export async function likePost(userId: number, postId: number) {
  // Verifica se o usuário já curtiu a postagem
  const existingLike = await db.select(likes)
    .where(likes.user_id.eq(userId))
    .andWhere(likes.post_id.eq(postId))
    .get();

  if (existingLike) {
    throw new Error('You have already liked this post');
  }

  // Insere uma nova curtida no banco de dados
  const [newLike] = await db.insert(likes)
    .values({
      user_id: userId,
      post_id: postId,
    })
    .returning();

  return newLike;
}

// Descurtir uma postagem
// Verifica se o usuário já curtiu a postagem consultando o banco de dados.
// Se o usuário tiver curtido a postagem, remove a entrada correspondente na tabela likes.
// Retorna uma mensagem de sucesso.
export async function unlikePost(userId: number, postId: number) {
  // Verifica se o usuário curtiu a postagem
  const existingLike = await db.select(likes)
    .where(likes.user_id.eq(userId))
    .andWhere(likes.post_id.eq(postId))
    .get();

  if (!existingLike) {
    throw new Error('You have not liked this post');
  }

  // Remove a curtida do banco de dados
  await db.delete(likes)
    .where(likes.user_id.eq(userId))
    .andWhere(likes.post_id.eq(postId))
    .execute();

  return { message: 'Like removed successfully' };
}

// Obter o número de curtidas de uma postagem
// Faz uma consulta ao banco de dados para contar o número de entradas na 
// tabela likes associadas à postagem.
// Retorna o número de curtidas.
export async function getLikesCount(postId: number) {
  const count = await db.select(likes)
    .where(likes.post_id.eq(postId))
    .count();

  return count;
}
