
# 🧠 Proyecto Node.js Clean Architecture

Este proyecto está construido usando **Node.js**, **TypeScript**, y **Sequelize** siguiendo los principios de **Clean Architecture** y **SOLID**, con separación de responsabilidades por capas.

---

## 🚀 Tecnologías principales

- **Node.js** / **Express**
- **TypeScript**
- **Sequelize ORM**
- **PostgreSQL** (puedes adaptarlo a otro)
- **Jest** (para pruebas)
- **Nodemailer** (para correos)
- Arquitectura: **Clean Architecture + SOLID**

---

## 📁 Estructura de carpetas

```text
application/
  use-cases/               → Casos de uso del negocio

domain/
  entities/                → Entidades del dominio (User, Order, etc.)
  interfaces/              → Contratos (repositorios, servicios externos)
  services/                → Lógica de negocio reutilizable

infrastructure/
  config/                  → Configuración del entorno
  database/
    models/                → Modelos Sequelize
    repositories/          → Implementaciones de repositorios
    migrations/            → Archivos de migraciones
  email/                   → Adaptadores de envío de correo
  logging/                 → Winston, Pino, etc.
  middlewares/             → Middlewares de Express
  utils/                   → Funciones utilitarias

presentation/
  controllers/             → Controladores HTTP
  routes/                  → Definición de rutas Express

types/                     → Tipos globales, DTOs, interfaces auxiliares
```

---

## 🧩 Diagrama general de arquitectura (Mermaid)

```mermaid
graph TD
    A[Client HTTP Request] --> B[Presentation Layer]
    B --> C[Application Layer (Use-Cases)]
    C --> D[Domain Layer]
    D --> E[Domain Entities]
    D --> F[Domain Services]
    D --> G[Interfaces (Contracts)]
    G --> H[Infrastructure Layer]
    H --> H1[Database (Sequelize Repos)]
    H --> H2[Email Provider]
    H --> H3[Logging, Utils, Middlewares]

    B[Presentation Layer]:::layer
    C[Application Layer]:::layer
    D[Domain Layer]:::layer
    H[Infrastructure Layer]:::layer

    classDef layer fill:#f9f,stroke:#333,stroke-width:1px;
```

---

## 🔁 Flujo típico de una petición `POST /register`

1. `UserController` recibe la petición HTTP.
2. Llama al `RegisterUserUseCase` con los datos del request.
3. El caso de uso:
   - Valida con `User` (entidad).
   - Usa `IUserRepository` y `PasswordService` del dominio.
4. Se inyecta `SequelizeUserRepository` desde `infrastructure/database/repositories`.
5. Se envía un correo mediante `NodemailerAdapter`.
6. Se devuelve una respuesta adecuada al cliente.

---

## ⚙️ Cómo correr el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
cp .env.example .env

# 4. Ejecutar migraciones
npx sequelize-cli db:migrate

# 5. Iniciar el servidor
npm run dev
```

---

## 🧪 Ejecutar pruebas

```bash
npm test
```

Puedes encontrar pruebas en:

```
tests/
 └── application/
 └── domain/
 └── infrastructure/
```

---

## 🔐 Principios aplicados

- **S**: Cada clase tiene una sola responsabilidad (ej. `GetUserProfileUseCase`).
- **O**: Nuevas funcionalidades se agregan sin modificar clases existentes.
- **L**: Clases hijas pueden reemplazar a padres sin romper comportamiento.
- **I**: Interfaces segregadas y específicas (no infladas).
- **D**: Los casos de uso dependen de abstracciones, no implementaciones concretas.

---

## 🧱 Consideraciones adicionales

- Se sigue el patrón **Hexagonal / Clean Architecture**.
- El **dominio no depende** de infraestructura ni de Express.
- Ideal para pruebas unitarias, integración y escalabilidad.
- Puedes extender la app fácilmente agregando nuevos casos de uso, entidades, o adaptadores.

---

## 👨‍💻 Autor

> Hecho por MiguelJMTA
> GitHub: https://github.com/MiguelJMTA/
