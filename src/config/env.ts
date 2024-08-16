//dotenv: Biblioteca usada para carregar variáveis de ambiente de um arquivo .env para process.env.
import dotenv from 'dotenv';

// dotenv.config() carrega as variáveis de ambiente do arquivo .env para process.env.
// As variáveis de ambiente são então exportadas como um objeto env que pode ser usado em todo o projeto.
dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Validação das variáveis de ambiente essenciais
if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

if (!env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}



// é responsável por carregar e gerenciar as variáveis de ambiente da aplicação. 
// Essas variáveis de ambiente geralmente são armazenadas em um arquivo
//.env na raiz do projeto e contêm informações sensíveis ou configuráveis, 
// como credenciais de banco de dados, chaves secretas para JWT, 
// configurações de API, etc.