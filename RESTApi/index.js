const fs = require("fs");
const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi this is Home Page");
});

app.use((req, res, next) => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const val = `\n${date.toLocaleDateString(options)} ${req.method}: ${req.url}`;
  fs.appendFile("./log.txt", val, (err, data) => {
    if (err) console.log(err);
    next();
  });
});

// Send a HTML res when /users
app.get("/users/", (req, res) => {
  const userName = users.map((el) => {
    return el.first_name;
  });
  const html = `
  <ul>
      ${userName
        .map((el) => {
          return `<li>${el}</li>`;
        })
        .join(" ")}
  </ul>
  `;
  res.send(html);
});

// Send all Users
app.route("/api/users/").get((req, res) => {
  res.json(users);
});

// Get User by ID
app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((e) => {
    return e.id === id;
  });
  res.json(user);
});

// Create New User
app.route("/api/users/").post((req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;
  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    gender,
    job_title,
  };
  users.push(newUser);
  fs.writeFile("./MOCK_DATA.json", `${JSON.stringify(users)}`, (err, data) => {
    return res.json(`new User Created wirh id`);
  });
});

// Delete User with ID
app
  .route("/api/users/:id")
  .delete((req, res) => {
    const id = req.params.id;
    const user = users.find((e) => e.id == id);
    const index = users.indexOf(user);
    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json(`User Deleted Successfully`);
    });
  })
  // Edit User with ID
  .patch((req, res) => {
    const id = req.params.id;
    const { first_name, email } = req.body;
    let user = users.find((e) => e.id == id);
    const index = users.indexOf(user);
    user.first_name = first_name;
    user.email = email;
    users.splice(index, 1, user);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json(`User Updated Successfully`);
    });
  });

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
