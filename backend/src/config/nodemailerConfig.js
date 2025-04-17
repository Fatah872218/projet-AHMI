import nodemailer from "nodemailer";
import dotenv from "dotenv";
// Charger les variables d'environnement
dotenv.config();

let transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export let sendConfirmationEmail = (email, motDePasse, activationCode) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Veuillez activer votre compte ",
      html: `
      <div>
      <h1>Activation du compte </h1>
        <h2>Bonjour ${nom}</h2>
        <p>Veuillez confirmer votre email en cliquant sur le lien suivant
</p>
        <a href=http://localhost:5173/confirm/${activationCode}>Cliquez ici
</a>
<ul>
<li> votre nom d'utilisateur ${nom}  </li>
<li> votre mot de passe ${motDePasse}  </li>
</ul>
        </div>`,
    })
    .catch((err) => console.log(err));
};
