// Tipos importados do Express para tipar as funções de middleware.
import { Request, Response, NextFunction } from 'express';
// Biblioteca usada para manipular JSON Web Tokens (verificação e decodificação).
import jwt from 'jsonwebtoken';
// Importa as variáveis de ambiente configuradas no arquivo env.ts, como a chave secreta (JWT_SECRET).
import { env } from '../config/env';

// Define a estrutura esperada do payload do JWT após a decodificação. 
// Neste caso, espera-se que o token contenha o id e o email do usuário.
interface JwtPayload {
  id: number;
  email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Extrai o token do cabeçalho "Authorization"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Supondo que o token seja passado como "Bearer <token>"

    if (!token) {
      return res.status(401).send({ message: 'Invalid token format' });
    }

    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Anexa as informações do usuário à requisição
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // Prossegue para a próxima função/middleware
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized: Invalid or expired token' });
  }
}

// O authMiddleware deve ser aplicado a qualquer rota que precise ser protegida, 
// ou seja, que só deve ser acessada por usuários autenticados.