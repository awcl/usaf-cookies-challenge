import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/', (req, res)  => {
  res.status(200).send(`We've been trying to reach you concerning your vehicle's extended warranty. You should've received a notice in the mail about your car's extended warranty eligibility. Since we've not gotten a response, we're giving you a final courtesy call before we close out your file. Press 2 to be removed and placed on our do-not-call list. To speak to someone about possibly extending or reinstating your vehicle's warranty, press 1 to speak with a warranty specialist....Valid paths: login/:name, /hello, and /logout`).end();
})

app.get('/login/:name', (req, res)  => {
  if (!req.cookies.name)  {
    res.cookie('name', req.params.name).cookie('created', new Date().toISOString());
    res.status(200).send(`${req.params.name}...I have to create a cookie on your machine`).end();
  } else {
    res.status(403).send(`${req.cookies.name}...you're already signed in so I'm not going to sign you in as "${req.params.name}" 👀 try logging out via /logout please`).end();
  }
});

app.get('/hello', (req, res)  => {
  req.cookies.name ?  res.status(200).send(`hello ${req.cookies.name}...your cookie was created at ${req.cookies.created}`).end() :
    res.status(401).send(`Looks like you're not signed in, try /login/:name`).end()
});

app.get('/logout', (req, res)  => {
  if (req.cookies.name)  {
    res.clearCookie('name').clearCookie('created');
    res.status(200).send(`You've been signed out, ${req.cookies.name}`).end();
  } else {
    res.status(401).send(`You weren't signed in 👀`).end();
  }
});

app.get('*', function (req, res) {
  res.status(404).send(`404: Try /login/:name or /hello instead of here, please`);
});

app.listen(3334, () => {});