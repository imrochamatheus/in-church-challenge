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
