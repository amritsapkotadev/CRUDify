const express = require("express");
const app = express();
const path = require("path");
const usermodel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Render the index page
app.get("/", (req, res) => {
  res.render("index");
});

// Render the read page
app.get("/read", async (req, res) => {
  try {
    let users = await usermodel.find();
    res.render("read", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error retrieving users" });
  }
});

// Handle user creation
app.post("/create", async (req, res) => {
  try {
    // Create a new user
    let createuser = await usermodel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image, // Assuming 'image' is the correct field
    });

    // Redirect to the read page after creation
    res.redirect("/read");
  } catch (error) {
    console.error(error);
    // Handle any errors during user creation
    res.status(500).send({ error: "Error creating user" });
  }
});
// Handle user deletion
app.get("/delete/:id", async (req, res) => {
  try {
    // Find and delete the user with the specified ID
    const deleteuser = await usermodel.findOneAndDelete({ _id: req.params.id });

    if (!deleteuser) {
      return res.status(404).send({ error: "User not found" });
    }

    // Log the deleted user
    console.log(deleteuser);
    
    // Redirect to the read page after deletion
    res.redirect("/read");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error deleting user" });
  }
});
app.get('/edit/:id', async (req, res) => {
  try {
    // Use 'usermodel' to find the user by ID
    const user = await usermodel.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Render the 'edit' page and pass the 'user' object to it
    res.render('edit', { user });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Error fetching user data');
  }
});
app.post('/update/:id', async (req, res) => {
  let {image, name, email, password} = req.body;
  let user=await usermodel.findOneAndUpdate({_id:req.params.id},{image, name, email, password}); 
res.redirect('/read');
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
