//importados do Express para tipar os parâmetros das funções de controle.
import { Request, Response } from 'express';
//funções importadas do serviço de curtidas (likeService.ts).
import { likePost, unlikePost } from '../services/likeService';

// Curtir uma postagem
// Obtém o userId do objeto req.user (presente após a autenticação).
// Extrai o postId dos parâmetros da URL.
// Chama o serviço likePost para curtir a postagem.
// Retorna uma mensagem de sucesso com um status 200.
// Em caso de erro, retorna um status 400 com a mensagem de erro
export async function like(req: Request, res: Response) {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const postId = parseInt(req.params.id, 10); // ID da postagem a ser curtida

    await likePost(userId, postId);
    res.status(200).send({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// Descurtir uma postagem
//Obtém o userId do objeto req.user (presente após a autenticação).
//Extrai o postId dos parâmetros da URL.
//Chama o serviço unlikePost para remover a curtida da postagem.
//Retorna uma mensagem de sucesso com um status 200.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function unlike(req: Request, res: Response) {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const postId = parseInt(req.params.id, 10); // ID da postagem a ser descurtida

    await unlikePost(userId, postId);
    res.status(200).send({ message: 'Post unliked successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
