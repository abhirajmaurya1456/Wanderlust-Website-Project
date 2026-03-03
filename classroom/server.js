//npm i cookie-parser
// npm i express-session
// npm i connect-flash
const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.use(session({secret:"mysupersecretstring", resave:false, saveUninitialized:true}));
app.use(flash());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
});

app.get("/test",(req,res)=>{
    res.send("test successful!");
});

app.get("/register",(req,res)=>{
    let {name='anonymous'}=req.query;
    req.session.name=name;
    if(name==='anonymous'){
        req.flash("error","user not registered !");
    }
    else{
        req.flash("success","user registered successfully!");
    }
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.render(`page.ejs`,{name:req.session.name});
});

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count+=1;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// });


// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// });
// app.get("/varify",(req,res)=>{
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("varified");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("Greet","Hello!");
//     res.cookie("madeIn","India");
//     res.send("Sent some cookies");
// });

// app.get("/",(req,res)=>{
// console.dir(req.cookies);
// res.send("Hi! I am root.");
// });
// app.get("/greet",(req,res)=>{
//     let {Name='anonymous'}=req.cookies;
// res.send(`Hi! I am ${Name}.`);
// });

// app.use("/users",users);
// app.use("/post",posts);

app.listen(3000,()=>{
console.log("server is listening to 3000...");
});