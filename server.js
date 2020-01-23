const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(
  express.json({
    extended: false
  })
);

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/cars", require("./routes/api/cars"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
