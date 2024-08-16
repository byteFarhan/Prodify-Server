const express = require("express");
const cors = require("cors");
const app = express();
const prot = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Prodify server is running...");
});

app.listen(prot, () => {
  console.log(`Prodify server is running in port ${prot}`);
});
