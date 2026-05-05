# Portfolio (Fullstack)

Небольшой fullstack проект портфолио с формой обратной связи.

## Что реализовано

* frontend на React
* backend на Node.js (Express)
* форма отправки сообщений
* интеграция с email (nodemailer)
* подключение к базе данных (MongoDB)

## Стек

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS

Backend:

* Node.js
* Express
* MongoDB (mongoose)
* Nodemailer

## Структура

```
backend/   — сервер (API)
frontend/  — клиентская часть
```

## Как запустить

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## Переменные окружения

Создать файл `.env` в папке backend:

```
MONGO_URI=your_mongo_uri
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## Статус

Проект в процессе доработки.
