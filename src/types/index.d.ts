// Extensão das interfaces do Express para incluir propriedades personalizadas
import { User } from '../models/userModel';

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Adiciona a propriedade 'user' ao Request para acessar o usuário autenticado
    }
  }
}



// O index.d.ts é um arquivo essencial em uma aplicação TypeScript bem tipada.
// Ele permite que você estenda e personalize os tipos fornecidos por bibliotecas externas, como o Express, de forma a atender melhor às necessidades específicas da sua aplicação. Isso resulta em uma base de código mais robusta e fácil de manter, com melhorias significativas na verificação de tipos
// e na experiência de desenvolvimento.