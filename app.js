const express = require("express");
const app = express();
const usermodel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Route to create a new user
app.get("/create", async (req, res) => {
  try {
    let createuser = await usermodel.create({
      name: "anita",
      email: "amrit@gmail.com",
      age: 25,
      username: "anita123"
    });

    console.log("User created", createuser);
    
    // Respond with JSON format (pretty printed)
    res.status(201).json({
      message: "User created successfully",
      user: createuser
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Error creating user");
  }
});

// Route to update an existing user
app.get("/update", async (req, res) => {
  try {
    let updateuser = await usermodel.findOneAndUpdate({ name: "John" }, { name: "Amrit" });
    console.log("User updated", updateuser);
    
     res.status(200).json({
      message: "User updated successfully",
      result: updateuser
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});
app.get("/read", async (req, res) => {
  try {
    let users = await usermodel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).send("Error reading users");
  }
});
app.get("/delete",async(req,res)=>{
    let user= await usermodel.findOneAndDelete({username:"anita123"});
    res.send(user);
res.send("user deleted");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
