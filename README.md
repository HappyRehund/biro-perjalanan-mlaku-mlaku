# Biro Perjalanan Mlaku-Mlaku API

RESTful API untuk sistem manajemen biro perjalanan yang dibangun dengan NestJS, TypeORM, dan PostgreSQL.

## 🚀 Live Demo

**API Base URL**: https://biro-perjalanan-mlaku-mlaku-production.up.railway.app/api/v1

**Swagger Documentation**: https://biro-perjalanan-mlaku-mlaku-production.up.railway.app/api

## 📋 Test Accounts

Gunakan akun berikut untuk menguji endpoint:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | rayhan-admin@gmail.com | Admin@123 |
| **Employee** | amalia-employee@mlakumlaku.com | Employee@123 |
| **Tourist** | yasmin-tourist@gmail.com | Tourist@123 |

## 📁 Project Structure

```
biro-perjalanan-mlaku-mlaku/
├── src/
│   ├── auth/                      # Authentication & Authorization Module
│   │   ├── constant/
│   │   ├── decorator/
│   │   ├── dto/
│   │   ├── guard/
│   │   ├── interface/
│   │   ├── strategy/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── user/                      # User Management Module
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── enum/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── travel-spot/               # Travel Destination Module
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── travel-spot.controller.ts
│   │   ├── travel-spot.module.ts
│   │   └── travel-spot.service.ts
│   ├── travel-package/            # Travel Package Module
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── travel-package.controller.ts
│   │   ├── travel-package.module.ts
│   │   └── travel-package.service.ts
│   ├── travel-trip/               # Trip Booking Module
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── travel-trip.controller.ts
│   │   ├── travel-trip.module.ts
│   │   └── travel-trip.service.ts
│   ├── config/                    # Configuration Files
│   │   └── database.config.ts
│   ├── migration/                 # Database Migrations
│   ├── common/                    # Shared Resources
│   ├── app.module.ts
│   └── main.ts
├── test/                          # E2E Tests
├── typeorm.config.ts              # TypeORM Configuration
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### 🔐 Auth Module
**Base Path**: `/api/v1/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new tourist account | Public |
| POST | `/admin/register-employee` | Register employee account | Admin |
| POST | `/login` | Login | Public |
| POST | `/refresh` | Refresh access token | JWT |
| GET | `/test` | Test authentication | JWT |

### 👥 User Module
**Base Path**: `/api/v1/user`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/tourist` | Get all tourists | Admin/Employee |
| POST | `/tourist` | Create tourist profile | Tourist |
| PATCH | `/tourist` | Update tourist profile | Tourist |
| GET | `/profile` | Get my profile | JWT |
| PATCH | `/employee/{id}/profile` | Update employee profile | Admin/Employee |
| GET | `/employee` | Get all employees | Admin |
| GET | `/employee/{id}` | Get employee by ID | Admin |
| GET | `/` | Get all users | Admin |
| GET | `/{id}` | Get user by ID | Admin |
| DELETE | `/{id}` | Delete user | Admin |
| PATCH | `/{id}/toggle-status` | Toggle user active status | Admin |

### 🏖️ Travel Spot Module
**Base Path**: `/api/v1/travel-spot`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create travel spot | Admin/Employee |
| GET | `/` | Get all travel spots | JWT |
| GET | `/search` | Search travel spots | JWT |
| GET | `/city/{city}` | Get spots by city | JWT |
| PATCH | `/{id}` | Update travel spot | Admin/Employee |
| DELETE | `/{id}` | Delete travel spot | Admin/Employee |

### 📦 Travel Package Module
**Base Path**: `/api/v1/travel-package`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create travel package | Admin/Employee |
| GET | `/` | Get all packages | JWT |
| GET | `/{id}` | Get package by ID | JWT |
| PATCH | `/{id}` | Update package | Admin/Employee |
| DELETE | `/{id}` | Delete package | Admin/Employee |
| POST | `/{packageId}/itinerary` | Create itinerary | Admin/Employee |
| GET | `/{packageId}/itinerary` | Get package itineraries | JWT |
| GET | `/{packageId}/itinerary/{itineraryId}` | Get itinerary by ID | JWT |
| PATCH | `/{packageId}/itinerary/{itineraryId}` | Update itinerary | Admin/Employee |
| DELETE | `/{packageId}/itinerary/{itineraryId}` | Delete itinerary | Admin/Employee |

### 🎫 Travel Trip Module
**Base Path**: `/api/v1/travel-trip`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create trip booking | Tourist |
| GET | `/` | Get all trips | Admin/Employee |
| GET | `/upcoming` | Get upcoming trips | JWT |
| GET | `/ongoing` | Get ongoing trips | JWT |
| GET | `/completed` | Get completed trips | JWT |
| GET | `/my-trips` | Get my trips | Tourist |
| GET | `/my-assignments` | Get my assignments | Employee |
| GET | `/tourist/{touristId}` | Get trips by tourist | Admin/Employee |
| GET | `/employee/{employeeId}` | Get trips by employee | Admin/Employee |
| GET | `/package/{packageId}` | Get trips by package | Admin/Employee |
| GET | `/{id}` | Get trip by ID | JWT |
| PATCH | `/{id}` | Update trip | Admin/Employee |
| DELETE | `/{id}` | Delete trip | Admin |

## 🛠️ Local Development Setup with Docker

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/HappyRehund/biro-perjalanan-mlaku-mlaku.git
cd biro-perjalanan-mlaku-mlaku
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Docker PostgreSQL

Create `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: biro_perjalanan_db
    restart: always
    environment:
      POSTGRES_DB: biro_perjalanan
      POSTGRES_USER: user
      POSTGRES_PASSWORD: rayhankaya123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start PostgreSQL container:

```bash
docker-compose up -d
```

Verify container is running:

```bash
docker ps
```

### Step 4: Setup Environment Variables

Create `.env` file in root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biro_perjalanan
DB_USER=user
DB_PASSWORD=rayhankaya123

JWT_ACCESS_SECRET=jwtsecretmilikarticleweb
JWT_ACCESS_EXPIRATION=1d

JWT_REFRESH_SECRET=jwtrefreshmilikarticleweb
JWT_REFRESH_EXPIRATION=7d
```

### Step 5: Run Database Migrations

```bash
npm run migration:run
```

### Step 6: Start Development Server

```bash
npm run start:dev
```

API will be available at:
- **API**: http://localhost:3000/api/v1
- **Swagger**: http://localhost:3000/api

## 📜 Available Scripts

### Development

```bash
# Start development server with hot-reload
npm run start:dev

# Start with debugging
npm run start:debug

# Format code
npm run format

# Lint code
npm run lint
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```
