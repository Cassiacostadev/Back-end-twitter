// Conexão com o banco de dados usando Drizzle ORM.
import { db } from '../db/connection';
// Esquemas das tabelas de usuários e postagens no banco de dados.
import { users, posts } from '../db/schema';

// Buscar usuários por nome ou email
// Recebe uma string de consulta (query), que é utilizada para buscar correspondências parciais (LIKE) no nome ou email dos usuários.
// A consulta é feita de forma insensível a maiúsculas/minúsculas usando ilike.
// Retorna uma lista de usuários que correspondem à consulta.
export async function searchUsers(query: string) {
  const searchQuery = `%${query}%`;

  const foundUsers = await db.select(users)
    .where(users.name.ilike(searchQuery))
    .orWhere(users.email.ilike(searchQuery))
    .getMany();

  return foundUsers;
}

// Buscar postagens por conteúdo ou hashtags
// Recebe uma string de consulta (query), que é utilizada para buscar correspondências parciais (LIKE) no conteúdo das postagens.
// A consulta também é feita de forma insensível a maiúsculas/minúsculas usando ilike.
// Retorna uma lista de postagens que correspondem à consulta.
export async function searchPosts(query: string) {
  const searchQuery = `%${query}%`;

  const foundPosts = await db.select(posts)
    .where(posts.content.ilike(searchQuery))
    .getMany();

  return foundPosts;
}

// Buscar hashtags (usando postagens que contêm a hashtag)
// Recebe uma string de consulta (query), que é utilizada para buscar postagens que contenham a hashtag especificada no conteúdo.
// A consulta adiciona automaticamente o símbolo "#" ao termo de pesquisa para garantir que a busca seja direcionada a hashtags.
// Retorna uma lista de postagens que contêm a hashtag.
export async function searchHashtags(query: string) {
  // O símbolo "#" pode ou não estar incluído na busca, por isso ajustamos a consulta
  const searchQuery = `%#${query}%`;

  const foundHashtags = await db.select(posts)
    .where(posts.content.ilike(searchQuery))
    .getMany();

  return foundHashtags;
}





// O operador ilike é utilizado para realizar buscas insensíveis a maiúsculas e minúsculas, 
// tornando a busca mais intuitiva e eficaz, especialmente para casos de uso em redes sociais onde usuários 
// podem utilizar diferentes capitalizações em seus nomes, emails, ou conteúdo de postagens.

// Os serviços fornecem a lógica de busca para os controladores (searchController.ts).
// Os controladores recebem as requisições HTTP, 
// chamam as funções de serviço correspondentes, e retornam os resultados aos clientes.