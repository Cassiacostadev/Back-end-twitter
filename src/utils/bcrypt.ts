// A biblioteca bcryptjs é usada para gerar o hash de senhas e 
// verificar se uma senha fornecida corresponde a um hash armazenado.
import bcrypt from 'bcryptjs';

// Função para gerar o hash de uma senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Número de rounds para gerar o salt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Função para verificar uma senha em relação ao hash armazenado
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}



// O bcrypt.ts encapsula a lógica de hashing e verificação de senhas, fornecendo funções
// utilitárias que podem ser reutilizadas em várias partes da aplicação. 
// Isso promove a consistência e segurança na manipulação de senhas,
// garantindo que as senhas sejam sempre armazenadas de forma segura e comparadas
// corretamente durante a autenticação.
// Essa separação de responsabilidades também facilita a manutenção e evolução do código.