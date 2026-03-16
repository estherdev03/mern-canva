const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();
dotenv.config();

require("./config/passport");

app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET || "canva-clone-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: `http://localhost:5173`,
      credentials: true,
    }),
  );
} else {
  app.use(
    cors({
      credentials: true,
    }),
  );
}

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/designRoutes"));

const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_DB_URI);
      console.log("Local database is connected...");
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Production database is connected...");
    }
  } catch (error) {
    console.log("Database connection falied.");
  }
};

dbConnect();

// Local development server; Vercel will use the exported app via /api.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
}

module.exports = app;
