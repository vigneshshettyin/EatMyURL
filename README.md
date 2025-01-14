# EatMyURL

EatMyURL is a high-performance, scalable analytics and URL management platform designed to capture and process user interactions efficiently. The system utilizes a microservices architecture, distributed event streaming, and cutting-edge database technologies to ensure fast and reliable performance.

---

## Architecture Overview

The EatMyURL platform integrates various components as shown in the updated architecture:

```
+-------+             +-----------------+         +--------------------+         +-------------------+
| Users | --------->  | Next.js Service | ----->  |    Redis Queue     | ----->  | Express.js Worker |
+-------+             +-----------------+         +--------------------+         +-------------------+
                           |                             |                             |
                           |                             |                             |
                           v                             |                             v
               +---------------------+                   |             +-----------------------+
               | Redis (TTL: 7 Days) |                   |             | PostgreSQL Database  |
               +---------------------+                   |             +-----------------------+
                                                         |
                                                         v
                                        +-------------------------------+
                                        |  Batch Insert into PostgreSQL |
                                        +-------------------------------+
```

### 1. **Users and Frontend Service**
- **Users:** Interact with the platform through the Next.js Service.
- **Next.js Service:** Handles user requests, manages state, and interacts with backend services. It performs the following key functions:
  - Pushes user activity logs to a Redis queue.
  - Fetches click analytics from the backend.
  - Caches frequently accessed data in Redis (TTL: 7 days).
  - Stores persistent data in a PostgreSQL (PG) database.

### 2. **Backend Processing**
- **Redis Queue:** Serves as a temporary storage system for user activity logs. The logs are later processed asynchronously by the worker service.
- **Express.js Worker:** Processes logs from the Redis queue and performs the following operations:
  - Inserts processed data into PostgreSQL in batches for efficiency.
  - Handles analytics queries from the frontend.

### 3. **Data Storage and Caching**
- **Redis (TTL, 7 Days):** Caches frequently accessed data for improved performance.
- **PostgreSQL Database:** Stores persistent user data, application state, and processed analytics logs.

---

## Key Features

1. **Real-time Click Analytics**
   - User interactions are captured and processed in real-time using Redis and PostgreSQL.

2. **Scalable and Fault-Tolerant**
   - Redis ensures scalability and fault tolerance for high traffic.

3. **High-Performance Caching**
   - Redis provides temporary storage to reduce query latency.

4. **Efficient Data Ingestion**
   - Batch processing reduces the load on the PostgreSQL database and ensures efficient data ingestion.

5. **Extensible Architecture**
   - The modular design allows easy integration of additional services or components.

---

## Technologies Used

- **Frontend:** Next.js
- **Queue:** Redis
- **Worker Service:** Express.js
- **Persistent Database:** PostgreSQL

---

## Getting Started

### Prerequisites
- Docker
- Node.js
- Redis
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/eatmyurl.git
   cd eatmyurl
   ```

2. Start services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Configure environment variables for each service:
   - `NEXT_PUBLIC_API_URL` (Next.js Service)
   - `REDIS_URL` (Redis Connection)
   - `PG_CONNECTION_STRING` (PostgreSQL Connection)

4. Start the Next.js service:
   ```bash
   npm run dev
   ```

---

## Usage

1. **User Logs:** User activity is logged via the Next.js service and pushed to Redis for processing.
2. **Analytics Query:** Click analytics are fetched from PostgreSQL through the worker service.
3. **Data Persistence:** User data is stored in PostgreSQL for long-term access.

---

## Versions

1. **Clickhouse and Kafka (v1):** [View Code](https://github.com/vigneshshettyin/EatMyURL/tree/27502e4bacfd73c91c1c2c7b3f247b7823537bae)
2. **Clickhouse and RabbitMQ (v2):** [View Code](https://github.com/vigneshshettyin/EatMyURL/tree/8223e910ac319cbe93c64c34523c28f60e9e642b)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Acknowledgments

Special thanks to the open-source community for providing the tools and inspiration to build this platform.
