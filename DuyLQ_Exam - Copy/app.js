const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use();
app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let todos = JSON.parse(data);
      console.log(todos);
      res.status(200).json(todos);
    }
  }); // Đọc file todos.json

  //   res.send("This is api");
});

app.get("/api/v1/todos/:id", (req, res) => {
  let todoId = req.params.id;
  // console.log(todoId);
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let todos = JSON.parse(data);
      let todoCheckId = todos.find((e) => e.id == todoId);
      console.log(todoCheckId);
      res.status(200).json(todoCheckId);
    }
  });
});

app.post("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let todoData = JSON.parse(data);
      let todoCheckTitle = todoData.findIndex((e) => e.title == req.body);
      let todoPush = {
        ...req.body,
        userId: Number(req.body.userId),
        id: Number(req.body.id),
        completed: Boolean(req.body.completed),
      };
      if (todoCheckTitle === -1) {
        todoData.push(todoPush);

        fs.writeFile(
          `${__dirname}/dev-data/todos.json`,
          JSON.stringify(todoData),
          (err) => {
            throw err;
          }
        );

        res.status(200).json({ message: "Create successfully" });
      } else {
        res.status(200).json({ message: "Todo already exists" });
      }
    }
  });
});

app.put(`/api/v1/todos/:id`, (err, data) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let todoData = JSON.parse(data);
      let todoCheckId = todoData.findIndex((e) => e.id == req.params.id);
      let todoUpdate = {
        ...req.body,
        userId: Number(req.body.userId),
        id: Number(req.body.id),
        completed: Boolean(req.body.completed),
      };
      if (todoCheckId == -1) {
        res.status(200).json({ message: " Todo not found" });
      } else {
        todoData[todoCheckId] = todoUpdate;
        fs.writeFile(
          `${__dirname}/dev-data/todos.json`,
          JSON.stringify(todoData),
          (err) => {
            throw err;
          }
        );
        res.status(200).json({ message: "Update successfully" });
      }
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
