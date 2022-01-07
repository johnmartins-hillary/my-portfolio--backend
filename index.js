import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mailGun from "nodemailer-mailgun-transport"

dotenv.config();
// app config
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// api rooutes
app.get("/", (req, res) => {
  res.send("welcome to my server");
});
app.post("/api/contact", (req, res) => {
  let data = req.body;
  console.log(data);

let auth = {
  auth: {
    api_key: "a4c388f5588625d9a60f927e59308ed8-0be3b63b-4cf67f2b",
    domain: "sandbox440d383033d24d1cac1968a4acc84454.mailgun.org",
  },
};

  let transporter = nodemailer.createTransport(mailGun(auth));
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

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send("message not sent");
      console.log(data)
    } else {
      res.send("success");
    }
  });
  transporter.close();
});

// listen
app.listen(port, () => {
  console.log(`litening to port: ${port}`);
});
