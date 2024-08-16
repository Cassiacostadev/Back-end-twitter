// A principal biblioteca para construir o servidor HTTP
import express from 'express';
// Habilita o Cross-Origin Resource Sharing, permitindo que a API seja acessada de diferentes domínios
import cors from 'cors';
// Um middleware de logging HTTP que registra as requisições no console, útil para depuração.
import morgan from 'morgan';
// Conjunto de middlewares de segurança que ajuda a proteger a aplicação de vulnerabilidades conhecidas, 
// como ataques de cross-site scripting (XSS).
import helmet from 'helmet';
//Middleware para fazer o parsing de JSON e URL-encoded nos corpos das requisições.
import { json, urlencoded } from 'body-parser';
//  Importa as rotas principais da aplicação, organizadas por funcionalidade
// (autenticação, usuários, postagens, busca, curtidas).
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';
import { searchRoutes } from './routes/searchRoutes';
import { likeRoutes } from './routes/likeRoutes';
// ErrorHandler: Middleware personalizado para tratamento de erros 
// (geralmente definido em middlewares/errorHandler.ts).
import { errorHandler } from './middlewares/errorHandler';

// Inicializa a aplicação Express
const app = express();

// Configura middlewares globais
app.use(helmet()); // Protege a aplicação contra algumas vulnerabilidades conhecidas
app.use(cors()); // Habilita o CORS para permitir requisições de outros domínios
app.use(morgan('dev')); // Loga as requisições HTTP no console
app.use(json()); // Faz o parsing de JSON no corpo das requisições
app.use(urlencoded({ extended: true })); // Faz o parsing de URL-encoded no corpo das requisições

// Registra as rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/likes', likeRoutes);

// Middleware global de tratamento de erros
app.use(errorHandler);

// Exporta a instância do app para ser usada no servidor
export default app;




// O app.ts é o coração da aplicação Express. Ele organiza e inicializa os principais componentes,
// incluindo middlewares, rotas e tratamento de erros. Ao separar a configuração da aplicação
// da inicialização do servidor (que pode ser feita em um arquivo server.ts separado),
// a arquitetura se torna mais modular e fácil de testar e manter.