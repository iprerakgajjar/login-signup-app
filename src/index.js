const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();

//convert data into Json method
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use Ejs as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('login');
});

app.get("/signup", (req, res) => {
    res.render('signup');
});

//Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const exuser = await collection.findOne({ name: data.name });
    if (exuser) {
        res.send("User already exist. please try another username");
    }
    else {
        //has the password using bcrypt
        const saultRounds = 10;
        const hashPassword = await bcrypt.hash(data.password, saultRounds);
        data.password = hashPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})

//Login user
/*app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name:req.body.username });
        if (!check) {
            res.send("Username not found");
        }
        else {
            //compare the hash password from the database with the plain text
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            console.log(isPasswordMatch);
            if (isPasswordMatch) {
                req.render("home");
            }
            else {
                req.send("Wrong password");
            }
        }
    }
    catch {
        res.send("Wrong details");
    }
})
*/
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("Username not found");
        } else {
            // Compare the hash password from the database with the plain text
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            console.log(isPasswordMatch);
            if (isPasswordMatch) {
                return res.render("home");
            } else {
                return res.send("Wrong password");
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.send("Wrong details");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
