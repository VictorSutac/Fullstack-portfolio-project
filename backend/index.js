require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const express = require("express"); // это? express - это фреймворк для
//  Node.js, который упрощает создание веб-приложений и API.
//  Он предоставляет удобные методы для обработки маршрутов,
//  запросов и ответов, а также поддерживает middleware для расширения
// функциональности.
const cors = require("cors"); // это? cors - это пакет для Node.js,
// который позволяет настраивать политику CORS
// (Cross-Origin Resource Sharing) для вашего сервера.
// CORS - это механизм безопасности, который позволяет
// ограничить доступ к ресурсам на вашем сервере
// только для определенных доменов или источников.
// С помощью cors вы можете легко разрешить или запретить
// доступ к вашему API с других доменов, что важно
// для обеспечения безопасности вашего приложения.

const mongoose = require("mongoose");
// это? mongoose - это библиотека
// для Node.js, которая
// предоставляет удобный интерфейс для работы с базой данных MongoDB.
// Она позволяет определять схемы данных, создавать модели и выполнять
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express(); // это? app - это экземпляр приложения, созданный с помощью
// express. Он используется для настройки маршрутов, middleware
// и других аспектов вашего веб-сервера. С помощью app вы можете
// определять, как ваш сервер будет обрабатывать входящие запросы
// и отправлять ответы клиенту. Например, вы можете использовать app.get()
// для обработки GET-запросов, app.post() для POST-запросов и так далее.

app.use(cors()); // это? app.use(cors()) - это вызов метода use()
// на экземпляре приложения (app) для подключения middleware CORS.
// Это позволяет вашему серверу обрабатывать запросы с других
//  доменов, что важно для обеспечения безопасности и функциональности
// вашего API.
// Когда вы используете cors() без аргументов, он разрешает
//  все домены, что может быть полезно для разработки, но в
// продакшене рекомендуется настроить его более строго, указав конкретные
// домены, которым разрешено обращаться к вашему API.
app.use(express.json()); // это? app.use(express.json()) - это вызов метода
// use()
// на экземпляре приложения (app) для подключения middleware,
// который позволяет вашему серверу обрабатывать входящие запросы
// с JSON-данными. Это означает, что когда клиент отправляет
// POST-запрос с JSON-данными в теле запроса, этот middleware
// автоматически парсит эти данные и делает их доступными в объекте req.body.
// Это упрощает обработку данных, отправляемых клиентом, и позволяет
// вам легко работать с ними в вашем коде.

// test route

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
// это? mongoose.connect(...) - это метод, который устанавливает соединение
// с базой данных MongoDB. В качестве аргументов он принимает строку
// подключения, которая определяет параметры подключения к базе данных.
// В данном случае мы используем строку подключения, которая указывает
//  на кластер MongoDB Atlas, а также имя пользователя
// и пароль для доступа к базе данных.
// .then(...) - это метод, который выполняется после успешного подключения
// к базе данных. В данном случае он выводит сообщение "MongoDB connected"
// в консоль.
// .catch(...) - это метод, который выполняется в случае ошибки при
// подключении к базе данных. В данном случае он выводит ошибку в консоль.

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);

app.get("/", (req, res) => {
  res.send("API работает");
}); // это? app.get("/", (req, res) => { ... }) - это определение маршрута для
//  обработки GET-запросов на корневой URL ("/") вашего сервера.
// Когда клиент отправляет GET-запрос на этот URL, функция обратного
//  вызова (callback) выполняется, и в данном случае она отправляет
// ответ "API работает" обратно клиенту. Это полезно для проверки,
// что ваш сервер работает и может обрабатывать запросы.

// contact route
// app.post("/contact", (req, res) => {
//   const { name, email, message } = req.body;
//   //это? const { name, email, message } = req.body; - это синтаксис
//   // деструктуризации в JavaScript, который позволяет извлекать значения из
//   // объекта req.body
//   // и присваивать их переменным name, email и message.
//   // В данном случае, когда клиент отправляет POST-запрос на маршрут "/contact"
//   // с JSON-данными, содержащими поля name, email и message, эти значения
//   // будут автоматически извлечены и доступны для использования в вашем коде.

//   // console.log("New message:");
//   // console.log(name, email, message);
//   console.log(req.body)
//   app.post("/contact", async (req, res) => {
//     try {
//       console.log("REQUEST BODY:", req.body);

//       const { name, email, message } = req.body;

//       const newMessage = new Message({
//         name,
//         email,
//         message,
//       });

//       await newMessage.save();

//       console.log("Saved to DB");

//       res.json({ success: true });
//     } catch (error) {
//       console.error("ERROR:", error);
//       res.status(500).json({ success: false });
//     }
//   });

//   res.json({ success: true }); // это? res.json({ success: true }); - это метод,
//   // который отправляет
//   // JSON-ответ обратно клиенту, указывая, что обработка запроса прошла успешно.
//   // В данном случае, мы возвращаем объект { success: true }, который будет
//   // автоматически преобразован в JSON и отправлен обратно клиенту.
// });

app.post("/contact", async (req, res) => {
  try {
    console.log("New contact request received");

    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
    // console.log("EMAIL_TO value:", process.env.EMAIL_TO);
    //     await transporter.sendMail({
    //       from: process.env.EMAIL_USER,
    //       to: process.env.EMAIL_USER,
    //       subject: "New message from portfolio",
    //       text: `
    // Name: ${name}
    // Email: ${email}
    // Message: ${message}
    //   `,
    //     });
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "New message from portfolio",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
  `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        success: false,
        message: "Email sending failed",
      });
    }
    console.log("Saved to DB");

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("ERROR:", error);
    // res.status(500).json({ success: false });
    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`); // это? app.listen(5001,
  // () => { ... }) - это метод, который запускает
  // ваш сервер и заставляет его слушать входящие запросы на указанном порту
  //  (в данном случае, 5000).
  // Когда сервер успешно запускается, функция обратного вызова (callback)
  // выполняется,
  // и в данном случае она выводит сообщение "Server started on port 5000"
  // в консоль,
  // что позволяет вам знать, что сервер работает и готов обрабатывать запросы.
});
