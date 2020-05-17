const express = require("express");
const app = express();

app.use(express.static("public"));


app.get('/', (req,res) => res.json({"dummy": "object result"}))

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
