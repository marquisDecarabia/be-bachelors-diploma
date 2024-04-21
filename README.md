# Дипломна робота (Крюкова Д.О.)

API для інтернет-магазину картин.

## Description

 - Створено на [NestJS](https://github.com/nestjs/nest) & [TypeScript](https://www.typescriptlang.org/).
 - Частина коду була сгенерована за допомогою [Hygen](http://www.hygen.io/).
 - Під час запуску проекту генерується документація за адресою ``/docs``.
 - **DDD Hexagon**.


## Installation

```bash
$ npm install
```

## Enviroment Variables

Приклад в ``.env.example``.
Для тестiв змiннi середовища берутся з ``.env.test``.

## DB Migration

```bash
# migration
$ npm run migration:run
```

## DB Seeding

```bash
# seeding
$ npm run seed:run
```

## Test

Перед тестами обов'язково потрiбно запустити seeding для БД (працює з ``.env.test``).

```bash
# e2e tests
$ npm run test:e2e
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
