# Recuperação de senha


**RF - Requisitos Funcionais**
  - O usuário deve poder recuperar sua senha informando o seu e-mail;
  - O usuário deve receber um email com instruções de recuperação de senha;
  - O usuário deve poder resetar sua senha;

**RNF - Requisitos não-funcionais**
  - Utilizar Mailtrap para testar envios em ambientes dev;
  - Utilizar SES(Simple Email Service) para envios em produção;
  - O envio de e-mails deve acontecer em segundo plano (background job);


**RN - Regras de negócio**
  - O link enviado por email para resetar senha deve expirar em 2h;
  - O usuário precisa confirmar a nova senha quando resetar;

# Atualização do perfil

**RF**
  - O usuário deve poder utilizar seu nome, email e senha;

**RN**
  - O usuário não pode alterar seu email para um email já utilizado;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**
 - O usuário deve poder listar seus agendamentos de um dia específico;
 - O prestador deve receber uma notificação sempre que houver um novo agendamento;
 - O prestador deve pode visualizar as notificações não lidas;

**RNF**
  - Os agendamentos do prestador no dia deve ser armazenado em cache;
  - As notificações do prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.IO;

**RN**
  - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços
**RF**
  - O usuário deve poder listar todos os prestadores de serviço cadastrados;
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  - O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
  - O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

  - A listagem de prestadores deve ser armazenada em cache;


**RN**
  - Cada agendamento deve durar 1h exatamente;
  - Os agendamentos devem esar disponíveis entre 8h as 18h (Primeiro às 8h, último as 17h);
  - O usuário não pode agendar em um horário já ocupado;
  - O usuário não pode agendar em um horário que já passou;
  - O usuário não pode agendar serviços com ele mesmo;
