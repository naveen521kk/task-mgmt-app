## Task Management App

This is a website written using Next.js and FastAPI. It is a task management app that allows users to create, update, and delete tasks. The website is hosted on Vercel and the backend is hosted on Render.

Live Demo URL: https://tasks.syrusdark.cc/

## Running the website locally

To run the website locally, you will need to have Node.js and Python (and poetry) installed on your computer. You will also need to have the following environment variables set or in your `.env` file (on `backend/` folder), see `.env.example` for an example of the environment variables needed:

- `SUPABASE_POSTGRES_URL`: The URL to your postgres database on Supabase

To run the website, you will need to run the following commands:

```bash
cd backend/
poetry install
poetry run python run.py
```


On another terminal, run the following commands:
```bash
cd frontend/
npm install
npm run dev
```

The website should now be running on `http://localhost:3000`.
