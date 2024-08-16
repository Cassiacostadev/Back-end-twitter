//Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
//Esquemas das tabelas de postagens, usuários, e seguidores no banco de dados.
import { posts, users, follows } from '../db/schema';

// Criar uma nova postagem
export async function createPost(userId: number, content: string, media?: string) {
  // Verificar se o conteúdo não ultrapassa o limite de caracteres
  // Se o conteúdo exceder 280 caracteres, lança um erro.
  if (content.length > 280) {
    throw new Error('Content exceeds the 280 character limit');
  }

  // Criar a nova postagem
  const [newPost] = await db.insert(posts).values({
    user_id: userId,
    content,
    media,
  }).returning();

  return newPost;
}

// Obter uma postagem por ID
//Faz uma consulta ao banco de dados para obter a postagem pelo seu ID, juntamente com os detalhes do usuário que a criou.
//Retorna a postagem encontrada.
export async function getPostById(postId: number) {
  const post = await db.select(posts)
    .where(posts.id.eq(postId))
    .leftJoin(users, posts.user_id.eq(users.id))
    .get();

  return post;
}

// Obter postagens de um usuário específico
// Faz uma consulta ao banco de dados para obter todas as postagens de um determinado usuário, 
// ordenadas por data de criação (da mais recente para a mais antiga).
export async function getUserPosts(userId: number) {
  const userPosts = await db.select(posts)
    .where(posts.user_id.eq(userId))
    .orderBy(posts.created_at.desc())
    .getMany();

  return userPosts;
}

// Faz uma consulta ao banco de dados para obter as postagens feitas pelos usuários que o usuário autenticado segue, bem como as suas próprias postagens.
// As postagens são ordenadas por data de criação, da mais recente para a mais antiga.
// Retorna uma lista de postagens para o feed.

// Obter postagens do feed (postagens do usuário e de quem ele segue)
export async function getFeedPosts(userId: number) {
  const feedPosts = await db.select(posts)
    .where(
      posts.user_id.in(
        db.select(follows.following_id)
          .from(follows)
          .where(follows.follower_id.eq(userId))
      )
    )
    .orWhere(posts.user_id.eq(userId))
    .orderBy(posts.created_at.desc())
    .getMany();

  return feedPosts;
}

// Responder a uma postagem
// Verifica se o conteúdo da resposta não ultrapassa o limite de 280 caracteres.
// Insere a resposta como uma nova postagem no banco de dados, associada à postagem original.
// Retorna a resposta recém-criada.
export async function replyToPost(userId: number, postId: number, content: string) {
  // Verificar se o conteúdo não ultrapassa o limite de caracteres
  if (content.length > 280) {
    throw new Error('Content exceeds the 280 character limit');
  }

  // Criar a resposta como uma nova postagem, com referência ao post original
  const [replyPost] = await db.insert(posts).values({
    user_id: userId,
    content,
    reply_to: postId,
  }).returning();

  return replyPost;
}
