const mongoose = require("mongoose");
const app = require("./app");

const port = 3001;

mongoose.connect("mongodb+srv://maksymDB:password22@cluster0.x0vi0qk.mongodb.net/logs").then(() => {
  console.log("Db connection is successful");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
