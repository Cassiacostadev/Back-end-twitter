// importados do Express para tipar os parâmetros das funções de controle.
import { Request, Response } from 'express';
//funções importadas do serviço de postagens (postService.ts).
import { createPost, getPostById, getUserPosts, getFeedPosts, replyToPost } from '../services/postService';

// Criar uma nova postagem
//Obtém o userId do objeto req.user (presente após a autenticação).
//Extrai content e media do corpo da requisição.
//Chama o serviço createPost para criar a postagem.
//Retorna a nova postagem com um status 201.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function create(req: Request, res: Response) {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const { content, media } = req.body;

    const post = await createPost(userId, content, media);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const postId = parseInt(req.params.id, 10);
    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Obter postagens de um usuário
//Extrai o postId dos parâmetros da URL.
//Chama o serviço getPostById para buscar a postagem.
//Se a postagem não for encontrada, retorna um status 404.
//Em caso de sucesso, retorna a postagem com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function getUserPostsController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId, 10);
    const posts = await getUserPosts(userId);

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Obter postagens do feed do usuário (posts do usuário e de quem ele segue)
//Obtém o userId do objeto req.user.
//Chama o serviço getFeedPosts para buscar as postagens do feed.
//Em caso de sucesso, retorna as postagens com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function getFeed(req: Request, res: Response) {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const posts = await getFeedPosts(userId);

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Responder a uma postagem
//Obtém o userId do objeto req.user e o postId dos parâmetros da URL.
//Extrai o content do corpo da requisição.
//Chama o serviço replyToPost para criar a resposta.
//Retorna a nova resposta com um status 201.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function reply(req: Request, res: Response) {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const postId = parseInt(req.params.id, 10);
    const { content } = req.body;

    const reply = await replyToPost(userId, postId, content);
    res.status(201).send(reply);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
