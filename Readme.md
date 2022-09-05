# FastAPI Postgres React (vite) template

A basic dockerised CRUD FastAPI implementation with postgres db, served with react using vite.

### 🏃‍♂️ How To Run

-   Ensure ports 5173, 8080, 8000, 5432 are free
-   do `docker-compose up --build` in the root directory of the project
-   goto http://localhost:5173 and enjoy the frontend
-   to explore the db run `docker exec -it postgres psql -U username -W vector` in the root of the project, give `password` as the password
-   An adminer instance is running on http://localhost:8080 in case you would like to examine the db that way

### 🐛 Known Bugs

- A basic frontend app is bundled for demo purposes
- If the cards get stuck on loading spinner instead of the images **for more than 5 seconds**, just do a refresh.
- If you see less than 5 cards after dragging/dropping try and drag/drop a card again.

### ⏲ Time Taken

-   10 Hours including frontend, backend, and devops with no prior FastApi experience

### General Questions

❓ Design the hypothetical API for this project if you had to allow for adding, removing and updating the elements. Consider long-term maintenance as well.

-   Answer : This is already done, please see implementation in `backend/api.py`, also, since the frontend is polling for changes on the backend, every time the backend updates, it reflects in the browser within 5 seconds, although the frontend design needs to be updated to accomodate more than 5 cards.

❓ How would you allow multiple users to edit this board in real time?

-   Answer: I would use websockets or some library like together.js to achieve this.
