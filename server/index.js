const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var session = require("express-session");
session = require("express-session");
var nodemailer = require("nodemailer");
// var bodyparser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyparser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Material",
});

app.post("/adduser", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const mobile = req.body.mobile;
  const password = req.body.password;

  db.query(
    "INSERT INTO dash (firstname,lastname,mobile,password) VALUES(?,?,?,?)",
    [firstname, lastname, mobile, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const mobile = req.body.mobile;
  const password = req.body.password;

  db.query(
    "INSERT INTO `dash` (firstname,lastname,mobile,password) VALUES(?,?,?,?)",
    [firstname, lastname, mobile, password],
    (err, result) => {
      console.log(err);
    }
  );
  app.post("/otp", (req, res) => {
    // const id = req.body.id;
    const user_id = req.body.user_id;
    // const otp = req.body.otp;
    const email = req.body.email;
    const is_verify = "Y";
    // ex_time = new Date().getHours()
    var date = new Date();
    date = date.setDate(date.getMinutes() + 1);
    const expiration_time = date;
    var otp = Math.floor(1000 + Math.random() * 9000);

    db.query(
      "INSERT INTO `otp-management`( `user_id`, `otp`, `email`, `is_verify`, `expiration_time`) VALUES (?,?,?,?,?)",
      [user_id, otp, email, is_verify, expiration_time],
      (err, result) => {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "kushvdarji@gmail.com",
            pass: "lequgskpfswekfre",
          },
        });

        var mailOptions = {
          from: "kushvdarji@gmail.com",
          to: "kushvdarji@gmail.com",
          subject: "For OTP",
          text:
            "Your OTP for verification is : " +
            otp +
            " Please Don't Share this to anyone",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            // res.json({success:false,error:error,message:"otp does not match"})
          } else {
            console.log("Email sent: " + info.response);
            // if(result.length>0){
            // res.json({success:true,result:result,message:"otp matched successfully"})}
          }
        });
        console.log(err);
      }
    );
  });
  // console.log(otp);
});

app.post("/login", (req, res) => {
  try {
    const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    // const mobile = req.body.mobile;
    const password = req.body.password;

    db.query(
      "SELECT * FROM dash WHERE firstname=? AND password=?",
      [firstname, password],
      (err, result) => {
        // console.log(result);
        if (err) {
          res.json({ success: false, err: err });
        } else {
          if (result.length > 0) {
            res.json({
              success: true,
              result: result,
              message: "Login Successful",
            });
            // console.log(result.length);
          } else {
            res.json({ success: false, message: "Wrong inputs" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.post("/otpverify", (req, res) => {
  try {
    const otp = req.body.otp;
    db.query(
      "SELECT * FROM `otp-management` WHERE otp=?",
      [otp],
      (err, result) => {
        if (err) {
          res.json({ success: false, err: err });
        } else {
          if (result.length > 0) {
            res.json({
              success: true,
              result: result,
              message: "OTP Verified",
            });
          } else {
            res.json({ success: false, message: "OTP Does Not Matched" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.get("/get", (req, res) => {
  db.query("SELECT * FROM dash", (error, result) => {
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM dash WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlget = "SELECT * FROM `dash` WHERE id=?";
  db.query(sqlget, id, (error, result) => {
    if (error) {
      res.json({ success: false, error: error });
      console.log(error);
    } else {
      res.json({ success: true, result: result });
    }
  });
});

app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, mobile, password } = req.body;
  const sqlupdate =
    "UPDATE `dash` SET firstname=?,lastname=?,mobile=?,password=? WHERE id=?";
  db.query(
    sqlupdate,
    [firstname, lastname, mobile, password, id],
    (error, result) => {
      if (error) {
        res.json({ success: false, error: error });
        console.log(error);
      } else {
        res.json({ success: true, result: result });
      }
    }
  );
});

app.get("/table/get",(req,res)=>{
  db.query("SELECT * FROM `Table`",(error,result)=>{
    console.log(result);
    res.send(result)
  })
})
app.get("/route/get",(req,res)=>{
  db.query("SELECT * FROM `module-management`",(error,result)=>{
    console.log(result);
    res.send(result)
  })
})

app.listen(3500, () => {
  console.log("running server");
});