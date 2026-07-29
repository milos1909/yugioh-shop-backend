# Yu-Gi-Oh! Shop Backend

Backend REST API for a **Yu-Gi-Oh! Shop** application that provides card browsing, card set information, and shop functionality.

This repository contains the server-side application responsible for business logic, database communication, and API endpoints.

## Features

- REST API for managing cards and card sets
- Card search and filtering functionality
- Card details retrieval
- Card set information management
- Retrieval of cards included in card sets
- Shop functionality for purchasing cards and sets
- User management
- Database integration and data persistence

## Technologies

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL
- JWT Authentication
- Bun

## API

The backend provides REST API endpoints used by the Yu-Gi-Oh! Shop frontend application.

Main functionality includes:

- User management
- Card management
- Card set management
- Shop operations

## Database

The application uses a relational database for storing application data.

Main entities include:

- User
- Card
- Set
- CardSet
- Invoice
- InvoiceItem

## Frontend

This backend API is consumed by the Yu-Gi-Oh! Shop frontend application.

[Yu-Gi-Oh! Shop Frontend](https://github.com/milos1909/yugioh-shop-frontend)

## Project Setup

### Install dependencies

```sh
bun install
```

### Environment Configuration

Create a `.env` file and configure the required environment variables.

Example:

```env
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
JWT_SECRET=
```

### Run Development Server

```sh
bun run dev
```

### Build for Production

```sh
bun run build
```
