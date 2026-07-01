Cinemais API
DESCRIÇÃO DO PROJETO

A Cinemais API é uma aplicação REST desenvolvida para gerenciamento de um catálogo de mídias (filmes e séries) e da lista de favoritos dos usuários.

A API permite:

Cadastrar filmes e séries no catálogo.
Listar todas as mídias cadastradas.
Buscar uma mídia específica por ID.
Adicionar mídias à lista de favoritos de um usuário.
Listar os favoritos de um usuário.
Remover mídias da lista de favoritos.
TECNOLOGIAS UTILIZADAS
Node.js
Fastify
MySQL


Justificativa das Escolhas
Fastify

O Fastify foi escolhido por oferecer:

Alto desempenho.
Baixo consumo de memória.
Suporte nativo ao TypeScript.
Estrutura simples e fácil de manter.

MySQL
O MySQL foi escolhido porque:

É um banco relacional consolidado.
Permite modelar facilmente relacionamentos entre tabelas.
Possui ótima integração com Node.js.
Facilita a implementação da tabela de favoritos através de chaves estrangeiras.


A utilização para os Endpoints foi insomnia as instruções era

GET Receber o catalogos de filmes 

http://localhost:3000/media

GET para buscar um ID especifico

http://localhost:3000/media/? <-- ID 

POST para inserir filmes ou series

http://localhost:3000/media

PUT para atualizar o filme especifico 

http://localhost:3000/media/? <-- ID especifico

DELETE para deletar um filme ou serie 

http://localhost:3000/media/? <-- ID especifico

ENDPOINTS PARA USUARIO

POST para adicionar ao favorito de um user especifico

http://localhost:3000/users/?/favoritos <-- Ponto de interrogação é onde voce colocara o ID do user especifico

GET Lista todos os filmes ou series que o user escolheu 
http://localhost:3000/users/?/favoritos <-- Ponto de interrogação é o ID do user especifico


