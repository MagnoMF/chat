# Projeto de Chat

Este é um projeto de chat simples desenvolvido usando C# para o backend e React para o frontend.

# Índice

1. Visão Geral
2. Funcionalidades
3. Tecnologias Utilizadas
4. Instalação
5. Uso

# Visão Geral

Este projeto é uma aplicação de chat que permite aos usuários enviar e receber mensagens em tempo real. Ele foi desenvolvido para demonstrar o funcionamento dos sockets e da comunicação em rede.

# Funcionalidades

1. Registro de usuários (localmente)
2. Envio e recebimento de mensagens em tempo real
3. Suporte a múltiplas salas de chat (máximo 5)
4. Remover chat
4. Interface amigável

# Tecnologias Utilizadas

- Backend -
  1. C# ASP.NET
  2. Core SignalR
- Frontend
  1. React (Usada para criar interface dinâmica)
  2. MicrosoftSignalr (Usada para realizar a comunicação cliente, servidor)

# Instalação

### Pré-requisitos

- .NET SDK (8.0.204)
- Microsoft.AspNetCore
- Node.js (v20.10.0)
- npm ou yarn (10.2.3)

## Backend

1.  Clone o repositório:

        git clone https://github.com/MagnoMF/chat.git
        cd chat/ChatSocketDotnet

2.  Instale as dependências:

        dotnet restore

3.  Inicie o servidor:

        dotnet run

## Frontend

1.  Navegue até o diretório do frontend:

        cd ../chat-socket-react

2.  Instale as dependências:

        npm install

3.  Inicie a aplicação:

        npm run start

## Uso

1. Abra o navegador e acesse http://localhost:3000.
2. Insira o nome do seu usuário
3. Adicione uma sala de chat clicando em +.
4. Clique no chat criado, envie mensagens pela barra de texto.
5. Para remover um chat, basta clicar no ícone de lixeira com o chat ativo e depois confirmar.

Link para o projeto: https://github.com/MagnoMF/chat
