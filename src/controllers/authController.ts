//importados do Express para tipar os parâmetros das funções de controle.
import { Request, Response } from 'express';
//funções importadas do serviço de autenticação (authService.ts).
import { registerUser, loginUser } from '../services/authService';
//importado de config/env.ts para acessar variáveis de ambiente, como o segredo do JWT.
import { env } from '../config/env';
//jsonwebtoken (jwt) é utilizado para criar tokens JWT para autenticação de usuários.
import jwt from 'jsonwebtoken';

// Registro de Usuário extrai os dados necessários (email, phone, password, name) do corpo da requisição.
//Chama o serviço registerUser para realizar o registro do usuário.
//Em caso de sucesso, retorna um status 201 com uma mensagem de sucesso.
//Em caso de erro, retorna um status 400 com a mensagem de erro.
export async function register(req: Request, res: Response) {
  try {
    const { email, phone, password, name } = req.body;
    await registerUser(email, phone, password, name);
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// Login de Usuário, Autenticar um usuário e gerar um token JWT.
// Extrai o email e password do corpo da requisição.
//Chama o serviço loginUser para autenticar o usuário.
//Se a autenticação for bem-sucedida, gera um token JWT com um tempo de expiração de 1 hora.
//Retorna o token em caso de sucesso.
//Em caso de erro ou credenciais inválidas, retorna um status apropriado com uma mensagem de erro.
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Gerar JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}