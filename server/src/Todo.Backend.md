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
[X] - Cadastro de especies (CRUD)
[X] - Cadastro de raças (CRUD)
[X] - Cadastro de Exames com Números de Tabelas (CRUD)
[X] - Sistema Internação
[X] - Sistema de Filas 
[] - Sistema Etiquetas 
[X] - Impressão do exame concluido via PDF





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
[X] - Configurar Exames com quantidades de tabelas 
[X] - Laboratório mostrar tabela conforme o exame e suas referências
[X] - Laboratório deve concluir exames
[] - Possibilidade de escolher unidade em banco unificado
[X] - Conclusão de cirurgias com laudo técnico
[] - Configuração de Eventos do Sistema para painel Administrativo
[] - Edição livre de referências do Exame
[X] - Internação possui diário 



### RFNs(Requisitos não-funcionais) ###
[X] - Senhas encriptadas
[X] - Autenticação por JWT
[X] - Motor de Busca Veterinários
[X] - Motor de Busca Laboratório
[] - Motor de Busca Internação
[] - Solicitado por/Concluido por em todas finalizações com valores
[X] - Dados devem ser persistidos em banco Postgres
[] - Implementação de Refresh Token
[] - Autorização por RBCA
 


### MELHORIAS ###
[] - Sistema de Notificações
[] - Sistema de Lembretes
[] - Sistema de Agenda de trabalho
[] - Sistema HelpDesk Interno


### ARQUITETURA INTERNA ### 
[] - Padronizar interfaces e contratos entre front/back
[] - Atualizar Tipagens e ajustar as que estão com any
[] - Reajustar pastas e padronizações front
[] - Converter chamadas API para React Query(objetivo tirar todos useEffect que chama API)
[] - Refatorar arquitetura back-end com SOLID 

## DILAN IMPORTANTE ##
[] - REFINAR SISTEMA FINANCEIRO
[] - DIMINUIR USO DE CONTEXTOS
[] - CACHEAR CHAMADAS BACKEND (REACT QUERY) 
[] - AJUSTAR PASTAS/ROTAS/COMPONENTS (Bagunçados pelo Vinicius)

#### BUGS e Correções  ####
[X] - Tabela exames duplicando
[X] - Ajustar cadastro de pets campo idade
[X] - Valores já prédefinidos dos exames que já existem
[] - ENCERRAMENTO DE QUEUE.
[] -  VERIFICAR PORQUE EXAME DUAS PARTES NÃO COMPUTOU QUE LAUDOU


### To do Solicitado Dr Daniel ###
[X] - correção por pesquisa no nome busca inteligente
[X] - Mascara no CPF e busca inteligente
[X] - Validação do CPF como encontrar a regra
[X] - Correios CEP Acesso externo
[X] - Busca rápida nos veterinarios / nome completo
[X] - Preferencia = Só aparece para a preferencia
[X] - Ordem de consulta é da antiga para a mais nova
[x] - Formularios, instruções do proprietário, autorizações (Autorizações/instruções já encontradas, procurando Formularios)
[X] - Exames, procedimentos, vacinas, cirurgias, internar
[X] - Concluir: ao clicar trazer os preços e validar
[X] - Subir procedimento
[X] - vacinas para cachorro e vacinas para gato, tirar a palavra "a fazer"
[X] - Macho não faz cesaria
[X] - Adicionar observações no Laudo
[X] - Painel de Internações, listagem e aparecer os animais, após 48hrs destacar o animal
[X] - histórico completo da diaria, custos na tela de procedimento
[X] - Criar acesso para desconcluir a consulta
[X]- trazer o código do animal
[X] - Histórico internação e custos tela internação
[X]- Código unico vinculado ao código da consulta
[X] - Liberar permissão para usuario de desconcluir
[X] - Legenda Internação abaixo de 24hrs verde...
[X] - Validação do CPF como encontrar a regra (confirmar api receita)
[X] - Visualização de todos os veterinarios
[X] - Filtro de vet só aparecer o vet ativo. mais pesquisa de qualquer forma
[X] - check de todos os veterinarios
[X] - Visualização de todos os veterinarios
[X] - Visualização de todos os veterinarios (usuario master vê toda a fila)
[x] - Preferencia = Só aparece para a preferencia
[x] - prontuario e pet descer a linha
[X] -  vacinas para cachorro e vacinas para gato (separar)
OBS: Não tem separação por especies nas vacinas, na verdade nem vacinas tem.
todas vacinas atuais do sistema antigo são procedimentos. solução incluir sistema de especies pra vacina também, já inclui nos Procedimentos, ou utilizar as vacinas dos procedimentos que já estão protegidas pelas especies.
[X] -  Procedimento para cachorro e vacinas para gato (separar)
OBS: Acrescentado sistema de Especies, um procedimento só vai poder ser lançado nas especies permitidas pelo Dr.
[x] -  Ao adicionar os procedimentos trazer especies permitidas
[x] -  Filtro no cadastro de procedimentos e vacinas
[x] -  Formularios (encontrar o PDF), instruções do proprietário (melhorar tamanho da letra)
[X] -  Cadastro de endereço mascara complemento e numero
[X] -  Tela de exames: colocar o botão de laudados (concluidos) e visualizar o laudo.
[] -  verificar a impressão: Ajustar os exames e laudos no pdf
[] -  Medicações: Historico e exclusão, varios remedios ao mesmo tempo, pesquisa(Front)