//Utilizado para gerenciar um pool de conexões com o banco de dados PostgreSQL.
import { Pool } from 'pg';
// drizzle do drizzle-orm: Inicializa o ORM (Object-Relational Mapper) que será utilizado para
// interagir com o banco de dados de forma estruturada.
import { drizzle } from 'drizzle-orm';
// Importa as variáveis de ambiente definidas no arquivo env.ts.
import { env } from '../config/env';

// Configuração da conexão com o banco de dados usando Pool do pg
// O Pool gerencia um conjunto de conexões reutilizáveis com o banco de dados, 
// o que é eficiente para aplicações que fazem muitas requisições de banco de dados.
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // Configurações adicionais podem ser adicionadas aqui, se necessário
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Inicializar o Drizzle ORM com a conexão do pool
export const db = drizzle(pool);

// Opção de testar a conexão imediatamente
export async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1'); // Testa uma consulta simples
    client.release();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1); // Finaliza o processo se a conexão falhar
  }
}

// Chame testConnection ao iniciar a aplicação, se necessário
testConnection();
