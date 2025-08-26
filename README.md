# Desafio Técnico - Desenvolvedor Front-End Pleno (Angular)

Uma aplicação full-stack que permite efetuar login, listar, atualizar e remover eventos.

---

## 🧩 Visão Geral

- **Frontend:** SPA desenvolvido em **Angular**, responsável pela interface de busca, listagem, exclusão e deleção de eventos.
- **Backend:** Fake API utilizando **Json-Server**, responsável por fornecer os dados a serem exibidos no frontend.
- A aplicação está containerizada com **Docker** e orquestrada com **Docker Compose**.

---

## 📦 Tecnologias Utilizadas

### Frontend (Angular)

- Angular 19
- RxJS
- Angular CLI
- PrimeNG
- Tailwind CSS
- Lucide-Angular

### Backend (Json-Server)

- Json-Server

### Infraestrutura

- Docker
- Docker Compose

---

## ▶️ Como Executar a Aplicação (Docker)

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos

1. Clone este repositório:

   ```bash
   git clone https://github.com/imrochamatheus/in-church-challenge.git
   cd in-church-challenge
   ```

2. Execute os containers:

   ```bash
   docker-compose up --build
   ```

3. Acesse a aplicação:
   - **Frontend (SPA):** [http://localhost:4200](http://localhost:4200)
   - **Backend (Fake-API Json Server):** [http://localhost:3000](http://localhost:3000)

> 🔁 Para reiniciar: `docker-compose down && docker-compose up --build`

---

## Melhorias futuras

   - Adição de parâmetros de paginação e modo de exibição (cards ou tabela) na URL
   - Implementação de testes unitários


## Aplicação em funcionamento

### Login

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/fb0f3d30-7f85-401c-a402-9291b2248d7b" />

### Cadastro de usuário

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/68786b47-a6cf-4930-be0b-94f171f9470a" />

### Listagem de eventos (Cards)

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/67294d5c-fce2-4008-b3a3-6ac46205eb71" />

### Página de listagem de eventos (Tabela)

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/660ed688-696b-403d-b9b0-eb6c4a0e3cce" />

### Página de detalhes do evento

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/c15967ea-1ce7-494b-b113-b239b5f52a6e" />

### Página de edição de evento 

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/eb8700a1-8d0a-4d45-b099-691be787bec5" />

### Confirmação de deleção do evento

<img width="1431" height="1010" alt="image" src="https://github.com/user-attachments/assets/29686c2e-abd0-4fdf-b7b0-9bfb46c199f0" />




