### RFS (Requisitos funcionais) ###
[x] - Cadastro de Clientes (CRUD)
[x] - Cadastro de Usuários (CRUD)
[x] - Cadastro de Pets (CRUD)
[x] - Cadastro de Vacinas (CRUD)
[x] - Cadastro de Autorizações (CRUD)
[x] - Cadastro Canils (CRUD)
[x] - Cadastro de Nº Leitos (CRUD)
[x] - Cadastro de Contas para Clientes (CRUD)
[x] - Cadastro de Setores (CRUD)
[X] - Cadastro de Cirurgias (CRUD)
[X] - Cadastro de Exames (CRUD)
[X] - Cadastro de Caixa (CRUD)
[X] - Cadastro de Caractéristicas para Exames (CRUD)
[X] - Histórico Vacinas do Pet
[X] - Histórico Internações do Pet
[X] - Histórico Exames do Pet
[X] - Histórico Cirurgia do Pet
[X] - Histórico do Caixa
[X] - Prontuário completo do Pet
[] - Cadastro de tipos de pagamentos (CRUD)
[] - Cadastro de especies (CRUD)
[] - Cadastro de raças (CRUD)
[] - Cadastro de Exames com Números de Tabelas (CRUD)
[X] - Sistema Internação
[X] - Sistema de Filas 
[] - Sistema Etiquetas 


### Regras de negócio ####
[X] - Não deve ter cadastros para usuários duplicados
[X] - Não deve ter cadastros para clientes duplicados
[X] - Não deve ter cadastros para pets duplicados
[x] - Deve haver tipos de usuários(Admin, Recepção, Veterinários, etc..)
[X] - Deve haver separação de interface(front) por tipo de usuário  
[X] - Usuários do tipo "Veterinários" podem cadastrar exames para pets 
[X] - Usuários do tipo "Veterinários" podem cadastrar cirurgias para pets 
[X] - Usuários do tipo "Veterinários" podem cadastrar vacinas para pets 
[X] - Usuários do tipo "Veterinários" podem internar pets 
[X] - Usuários do tipo "Veterinários" podem encerrar atendimento dos pets 
[X] - Usuários do tipo "Recepção" podem cadastrar pets 
[X] - Usuários do tipo "Recepção" podem abrir atendimento para pets 
[X] - Usuários do tipo "Recepção" podem cadastrar clientes novos  
[X] - Usuários do tipo "Recepção" podem atualizar dados dos cientes 
[X] - Usuários do tipo "Recepção" podem abrir e fechar caixa
[X] - Usuários do tipo "Recepção" podem cobrar débitos dos cientes
[X] - Usuários do tipo "Recepção" podem alterar tipos de atendimento
[] - Usuários do tipo "Recepção" podem retirar valores do caixa
[] - Usuários do tipo "Recepção" podem realizar devoluções
[x] - Encerrar atendimentos deve ser lançado débito para o cliente dono do animal
[X] - Deve ser Possivel configurar valores na internação
[x] - Internação tem divisão por dois periodos de 12 horas e cobrar meio periodo a cada 12 horas
[X] - Configurar Exames com caractéristicas 
[] - Configurar Exames com quantidades de tabelas 
[] - Laboratório mostrar tabela conforme o exame e suas referências
[] - Laboratório deve concluir exames
[] - Conclusão de cirurgias com laudo técnico




### RFNs(Requisitos não-funcionais) ###
[X] - Senhas encriptadas
[X] - Autenticação por JWT
[X] - Motor de Busca Veterinários
[] - Motor de Busca laboratório
[] - Motor de Busca internação
[] - Solicitado por/Concluido por em todas finalizações com valores
[X] - Dados devem ser persistidos em banco Postgres



### MELHORIAS ###
[] - Sistema de Notificações
[] - Sistema de Lembretes
[] - Sistema de Agenda de trabalho


### ARQUITETURA INTERNA ### 
[] - Padronizar interfaces e contratos entre front/back
[] - Atualizar Tipagens e ajustar as que estão com any
[] - Reajustar pastas e padronizações front
[] - Refatorar arquitetura back-end com SOLID 


#### BUGS e Correções  ####
[] - Tabela exames duplicando
[] - Ajustar cadastro de pets campo idade