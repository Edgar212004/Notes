const express = require("express");
const path = require("path");


const app = express();
const PORT = 3000;
const   PUBLIC = path.join(__dirname, "public")


app.use(express.urlencoded({extended: true}));
app.use(express.static(PUBLIC));

app.get("/",(req, res) => {
    console.log("Loading home...");
    res.sendFile(path.join(PUBLIC, "home.html"));
});

app.post("/newnote", (req, res)=>{
    const name = req.body.name;
    const Content = req.body.content;
    const label = req.body.label;

    console.log("Form data\n");
    console.log("Name: " + name);
    console.log("Content: " + Content);
    console.log("label: " + label);

    res.redirect("/");
})

app.listen(PORT, () => (
    console.log("👾Server is running on port " + PORT)
));

