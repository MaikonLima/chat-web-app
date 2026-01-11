
# 💬 Chat.io – Full Stack

Aplicação de chat web em tempo real, onde cada aba do navegador representa um usuário diferente.
O sistema permite login simples, troca de mensagens em tempo real, indicador de digitação, notificações, contador de mensagens não lidas e alternância de tema (claro/escuro).

## 🧩 Funcionalidades

- Login simples com nome de exibição
- Criação e entrada em salas de chat
- Mensagens em tempo real via WebSocket
- Indicador de “usuário digitando”
- Notificações de novas mensagens
- Contador de mensagens não lidas no título da aba
- Feedback visual de usuários entrando e saindo
- Tema claro / escuro com toggle
- Arquitetura baseada em boas práticas (DDD + Clean Architecture)


## 🖥️ Frontend

Tecnologias e ferramentas utilizadas:
- React
- Vite
- TypeScript
- Zustand (gerenciamento de estado global)
- Socket.IO Client
- Shadcn/UI
- Tailwind CSS
- Atomic Design (atoms, molecules, organisms, templates)
- Web Notifications API
- Dark / Light Mode

### 📌 O frontend é responsável por:

- Gerenciar estado da aplicação
- Controlar UX (typing indicator, notificações, contador)
- Comunicação em tempo real com o backend
- Persistência leve em ```sessionStorage```

## ⚙️ Backend

Tecnologias e ferramentas utilizadas:
- Node.js
- NestJS
- TypeScript
- Socket.IO
- PNPM
- class-validator
- Arquitetura DDD + Clean Architecture
- Persistência em memória
- Logging customizado

### 📌 O backend:

- Gerencia salas de chat
- Orquestra casos de uso (join, leave, send message)
- Retransmite eventos em tempo real
- Mantém domínio desacoplado da infraestrutura


## 🧠 Arquitetura

- Domain Driven Design (DDD) de forma pragmática
- Ports & Adapters (Hexagonal Architecture)
#### Separação clara entre:
- Domain
- Application
- Infrastructure
- Presentation

## 🖼️ Imagens do Sistema




## 🐳 Executando com Docker

O projeto possui um docker-compose de desenvolvimento, permitindo subir frontend e backend com um único comando.

### 📦 Pré-requisitos

- Docker
- Docker Compose

### ▶️ Comandos

#### Iniciar aplicação (frontend + backend)
```bash
docker compose -f docker-compose.dev.yml up --build
```

#### Parar os serviços
```bash
docker compose -f docker-compose.dev.yml down
```
#### Visualizar logs
```bash
docker compose -f docker-compose.dev.yml logs -f
```

## 🌐 Endereços

| Serviço   | URL                                            |
| --------- | ---------------------------------------------- |
| Frontend  | [http://localhost:5173](http://localhost:5173) |
| Backend   | [http://localhost:3000](http://localhost:3000) |
| WebSocket | ws://localhost:3000                            |