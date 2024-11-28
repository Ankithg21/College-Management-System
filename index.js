const express=require("express");
const app=express();
const path=require("path");
const body_parser=require("body-parser");
var methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended:true}));
app.use(body_parser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


const port=8080;

let posts=[
    // {
    //     id:uuidv4(),
    //     name:"Ankith G",
    //     content:"CSE Dept"
    // },
    // {
    //     name:"Anil H",
    //     content:"CSE Dept",
    //     id:uuidv4(),
    // },
    // {
    //     id:uuidv4(),
    //     name:"binay P",
    //     content:"CSE Dept"
    // }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {name,content}=req.body;
    let id=uuidv4();
    posts.push({id,name,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((posts)=>id===posts.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((posts)=>id===posts.id);
    post.content=newContent;
    console.log(newContent);
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((posts)=>posts.id != id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((posts)=>posts.id===id);
    res.render("edit.ejs",{post});
});

app.get("/",(req,res)=>{
    res.send("hi");
});


app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
});