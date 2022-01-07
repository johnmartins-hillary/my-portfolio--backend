import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()
// app config
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// api rooutes
app.get("/", (req,res) => {
  res.send("welcome to my server");
});
app.post("/api/contact", (req, res) => {
  let data = req.body;
  console.log(data)
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "ekwealorhillary@gmail.com",
      pass: `${process.env.MY_PASSWORD}`,
    },
  });
  let mailOptions = {
    from: data.email,
    to: "ekwealorhillary@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
      <h3>Informations</h3>
      <ul>
          <li>Name: ${data.name}</li>
          <li>Email: ${data.email}</li>
          <li>Subject: ${data.subject}</li>
      </ul>
      
      <h3>Message</h3>
      <p>${data.message}</p>`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send("message not sent");
    } else {
      res.send("success");
    }
  });
  smtpTransport.close();
});

// listen
app.listen(port, () => {
  console.log(`litening to port: ${port}`);
});
