require("dotenv").config();

const requiredEnv = ["MONGO_URI", "RESEND_API_KEY", "EMAIL_TO", "CLIENT_URL"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json({ limit: "10kb" }));
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);

app.get("/", (req, res) => {
  res.send("API работает");
});

app.post("/contact", contactLimiter, async (req, res) => {
  try {
    console.log("New contact request received");

    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Name is too long",
      });
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long",
      });
    }

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

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
  console.log(`Server started on port ${PORT}`);
});
