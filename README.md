# Fullstack Portfolio Project

Personal portfolio website with a working contact form.

This project is not only a static portfolio page. It has a React frontend, an Express backend, MongoDB storage, server-side validation, rate limiting, CORS configuration, and email delivery through Resend.

The goal of the project is to show both frontend skills and basic fullstack understanding: how the browser, API server, database, environment variables, and external email service work together.

## What The Project Does

- Shows a personal portfolio page with sections for hero, about, projects, contact, and footer.
- Allows a visitor to send a message through the contact form.
- Validates form data on the frontend for better user experience.
- Validates form data again on the backend for security.
- Saves contact messages to MongoDB.
- Sends an email notification through Resend.
- Limits repeated contact requests to reduce spam.
- Restricts browser access to the backend with CORS.

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- Resend
- express-rate-limit
- dotenv
- cors

## Project Structure

```txt
backend/
  index.js          Express API server
  package.json      Backend dependencies and scripts
  .env              Backend environment variables, not committed to Git

frontend/
  src/
    sections/       Page sections: Hero, About, Projects, Contact, Footer
    App.tsx         Main app layout
    main.tsx        React entry point
  package.json      Frontend dependencies and scripts
  .env              Frontend environment variables, not committed to Git

README.md           Project documentation
```

## How The Contact Form Works

The contact flow is:

```txt
User fills the form
    ↓
Frontend sends POST request to backend /contact
    ↓
Backend checks rate limit
    ↓
Backend validates name, email, and message
    ↓
Backend saves the message to MongoDB
    ↓
Backend sends an email through Resend
    ↓
Frontend shows success or error message
```

This is the important fullstack idea:

- Frontend validation helps the user.
- Backend validation protects the server.
- Database schema validation protects stored data.
- Environment variables keep secrets and deployment-specific values out of source code.

## Backend Details

The backend is located in:

```txt
backend/index.js
```

Main responsibilities:

- Load environment variables with `dotenv`.
- Check that required environment variables exist.
- Connect to MongoDB with Mongoose.
- Configure CORS so only the allowed frontend can call the API from the browser.
- Parse JSON request bodies with a small size limit.
- Protect `/contact` with rate limiting.
- Validate incoming data.
- Save messages to MongoDB.
- Send email notifications with Resend.

### Required Backend Environment Variables

Create this file:

```txt
backend/.env
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
RESEND_API_KEY=re_your_resend_api_key
EMAIL_TO=your_email@example.com
CLIENT_URL=http://localhost:5173
PORT=5001
```

Explanation:

- `MONGO_URI` is the MongoDB Atlas connection string.
- `RESEND_API_KEY` is the API key from Resend.
- `EMAIL_TO` is the email address that receives contact form messages.
- `CLIENT_URL` is the frontend URL allowed by CORS.
- `PORT` is the backend port.

Important: `.env` files must not be committed to Git because they contain secrets.

### Backend Validation

The backend checks:

- `name` is required.
- `email` is required and must look like a valid email address.
- `message` is required.
- `name` is not longer than 80 characters.
- `email` is not longer than 254 characters.
- `message` is not longer than 2000 characters.

This matters because a request can be sent directly to the backend without using the frontend form.

### Rate Limiting

The `/contact` endpoint is limited to 5 requests per 15 minutes per IP.

This reduces spam and protects:

- the email service,
- the database,
- the backend server.

## Frontend Details

The frontend is located in:

```txt
frontend/src
```

Main sections:

- `Hero.tsx` - intro section with name, role, avatar, and navigation buttons.
- `About.tsx` - short personal description and skills.
- `Projects.tsx` - project cards with tech stack and links.
- `Contact.tsx` - contact details and form.
- `Footer.tsx` - footer.

### Required Frontend Environment Variables

Create this file:

```txt
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5001
```

Explanation:

- `VITE_API_URL` tells the frontend where the backend API is.
- In local development it points to `http://localhost:5001`.
- In production it should point to the deployed backend URL.

Vite only exposes frontend environment variables that start with `VITE_`.

## How To Run Locally

Install backend dependencies:

```bash
cd backend
npm install
```

Start backend:

```bash
npm run dev
```

If watch mode fails with `EMFILE: too many open files, watch`, use:

```bash
npm start
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

Local URLs:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:5001
```

## How To Test The Contact Form

1. Start the backend.
2. Start the frontend.
3. Open the frontend in the browser.
4. Go to the contact section.
5. Submit an empty form and check that validation works.
6. Submit an invalid email and check that validation works.
7. Submit a real message.
8. Check MongoDB for the saved message.
9. Check the receiving email inbox.

You can also test the backend directly:

```bash
curl -i -X POST http://localhost:5001/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from curl test"}'
```

## Useful Scripts

Backend:

```bash
npm start
npm run dev
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment Notes

The project has two parts, so deployment also has two parts:

1. Deploy the backend API.
2. Deploy the frontend website.

Recommended setup:

- Backend: Render
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas
- Email: Resend

### Backend Deployment

Backend settings:

```txt
Root directory: backend
Build command: npm install
Start command: npm start
```

Backend environment variables in the hosting dashboard:

```env
MONGO_URI=your_production_mongo_uri
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=your_email@example.com
CLIENT_URL=https://your-frontend-domain.com
PORT=5001
```

After deployment, the backend will have a public URL, for example:

```txt
https://your-backend.onrender.com
```

### Frontend Deployment

Frontend settings:

```txt
Root directory: frontend
Build command: npm run build
Output directory: dist
```

Frontend environment variables in the hosting dashboard:

```env
VITE_API_URL=https://your-backend.onrender.com
```

After the frontend is deployed, update backend `CLIENT_URL` to the real frontend URL.

Example:

```env
CLIENT_URL=https://your-frontend.vercel.app
```

This is required because the backend CORS configuration only allows requests from `CLIENT_URL`.

## Common Problems

### Missing required environment variable

Example:

```txt
Missing required environment variable: RESEND_API_KEY
```

Meaning:

The variable is missing from `backend/.env` or from the hosting dashboard.

Fix:

Add the missing variable and restart the backend.

### Invalid MongoDB scheme

Example:

```txt
Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"
```

Meaning:

`MONGO_URI` is not a real MongoDB connection string.

Fix:

Make sure it starts with:

```txt
mongodb+srv://
```

### CORS error in browser

Meaning:

The frontend URL is not allowed by the backend.

Fix:

Set backend `CLIENT_URL` to the real frontend URL.

### Email sending failed

Possible reasons:

- `RESEND_API_KEY` is wrong.
- Resend account restrictions apply.
- `from` email is not allowed.
- A verified domain is required for production sending.

## What I Learned From This Project

- How to structure a small fullstack project.
- How React talks to an Express API.
- Why frontend validation is not enough.
- How to validate data on the backend.
- How to store form submissions in MongoDB.
- How to send email from a backend service.
- Why secrets should live in `.env`.
- How CORS protects browser access.
- How rate limiting helps reduce spam.
- How to prepare a project for deployment.

## Repository

GitHub:

```txt
https://github.com/VictorSutac/Fullstack-portfolio-project
```

## Status

The project is working locally and prepared for deployment.
