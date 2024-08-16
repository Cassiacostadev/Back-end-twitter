//importados do Express para tipar os parâmetros das funções de controle.
import { Request, Response } from 'express';
//são funções importadas do serviço de busca (searchService.ts).
import { searchUsers, searchPosts, searchHashtags } from '../services/searchService';

// Buscar Usuários
// Extrai a query de busca (query) dos parâmetros de consulta (req.query.q).
//Verifica se a query está presente; se não, retorna um status 400 com uma mensagem de erro.
//Chama o serviço searchUsers para realizar a busca de usuários.
//Retorna os resultados da busca com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function searchForUsers(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).send({ message: 'Query parameter is required' });
    }

    const users = await searchUsers(query);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Buscar Postagens
//Extrai a query de busca (query) dos parâmetros de consulta (req.query.q).
//Verifica se a query está presente; se não, retorna um status 400 com uma mensagem de erro.
//Chama o serviço searchPosts para realizar a busca de postagens.
//Retorna os resultados da busca com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function searchForPosts(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).send({ message: 'Query parameter is required' });
    }

    const posts = await searchPosts(query);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Buscar Hashtags
//Extrai a query de busca (query) dos parâmetros de consulta (req.query.q).
//Verifica se a query está presente; se não, retorna um status 400 com uma mensagem de erro.
//Chama o serviço searchHashtags para realizar a busca de hashtags.
//Retorna os resultados da busca com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function searchForHashtags(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).send({ message: 'Query parameter is required' });
    }

    const hashtags = await searchHashtags(query);
    res.status(200).send(hashtags);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}