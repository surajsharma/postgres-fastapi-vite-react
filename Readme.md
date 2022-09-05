# FastAPI/Postgres/React (vite) template

> A basic dockerised CRUD FastAPI implementation with postgres db, served with react using vite.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### 🏃‍♂️ How To Run

-   Ensure ports 5173, 8080, 8000, 5432 are free
-   do `docker-compose up --build` in the root directory of the project
-   goto http://localhost:5173 and enjoy the frontend
-   to explore the db run `docker exec -it postgres psql -U username -W vector` in the root of the project, give `password` as the password
-   An adminer instance is running on http://localhost:8080 in case you would like to examine the db that way
