// são importados do Express para tipar os parâmetros das funções de controle.
import { Request, Response } from 'express';
//funções importadas do serviço de usuários (userService.ts).
import { getUserProfile, updateUserProfile, followUser, unfollowUser } from '../services/userService';

// Visualizar Perfil de Usuário
//Extrai o userId dos parâmetros da URL.
//Chama o serviço getUserProfile para obter os dados do perfil do usuário.
//Se o usuário não for encontrado, retorna um status 404 com uma mensagem apropriada.
//Em caso de sucesso, retorna os dados do perfil com um status 200.
//Em caso de erro, retorna um status 500 com a mensagem de erro.
export async function viewProfile(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const profile = await getUserProfile(userId);

    if (!profile) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// Atualizar Perfil de Usuário
//Obtém o userId do objeto req.user (assumindo que o middleware de autenticação já tenha verificado e atribuído o ID do usuário autenticado).
//Extrai os dados de atualização do corpo da requisição.
//Chama o serviço updateUserProfile para atualizar os dados do perfil.
//Em caso de sucesso, retorna os dados atualizados com um status 200.
//Em caso de erro, retorna um status 400 com a mensagem de erro.

export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.user.id; // Assumindo que o ID do usuário esteja disponível após autenticação
    const updatedData = req.body;
    const updatedProfile = await updateUserProfile(userId, updatedData);

    res.status(200).send(updatedProfile);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// Seguir um Usuário
//Obtém o userId do objeto req.user e o followUserId dos parâmetros da URL.
//Chama o serviço followUser para seguir o usuário.
//Em caso de sucesso, retorna uma mensagem de confirmação.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function follow(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const followUserId = parseInt(req.params.id, 10);

    await followUser(userId, followUserId);
    res.status(200).send({ message: 'Followed user successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// Deixar de Seguir um Usuário
//Obtém o userId do objeto req.user e o unfollowUserId dos parâmetros da URL.
//Chama o serviço unfollowUser para deixar de seguir o usuário.
//Em caso de sucesso, retorna uma mensagem de confirmação.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function unfollow(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const unfollowUserId = parseInt(req.params.id, 10);

    await unfollowUser(userId, unfollowUserId);
    res.status(200).send({ message: 'Unfollowed user successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
