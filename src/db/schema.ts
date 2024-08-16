import { createTable, serial, varchar, text, integer, timestamp, boolean, foreignKey } from 'drizzle-orm';

// Definição da tabela de usuários
export const users = createTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', 50).unique(),
  phone: varchar('phone', 12).unique(),
  password: varchar('password', 255),
  name: varchar('name', 255),
  bio: text('bio').nullable(),
  avatar: text('avatar').nullable(),
  created_at: timestamp('created_at').defaultNow(),
});

// Definição da tabela de postagens
export const posts = createTable('posts', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  content: text('content').notNull(),
  media: text('media').nullable(),
  reply_to: integer('reply_to').references(() => posts.id).nullable(), // Para respostas a outras postagens
  created_at: timestamp('created_at').defaultNow(),
});

// Definição da tabela de curtidas
export const likes = createTable('likes', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  post_id: integer('post_id').references(() => posts.id),
  created_at: timestamp('created_at').defaultNow(),
});

// Definição da tabela de seguidores
export const follows = createTable('follows', {
  follower_id: integer('follower_id').references(() => users.id),
  following_id: integer('following_id').references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
});
