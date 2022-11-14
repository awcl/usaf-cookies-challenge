//Create an Express application that sets a cookie when routed to /login with their name. If a cookie is present with a name key, then it says "Welcome {name}! when the user routes to /hello".
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/login/:name', (req, res)  => {
  res.cookie("name", req.params.name);
  res.status(200).send(`${req.params.name}...I have to create a cookie on your machine since you navigated here`).end();
});

app.get('/hello', (req, res)  => {
  req.cookies.name ?  res.status(200).send(`hello ${req.cookies.name}`).end() :
    res.status(200).send(`Looks like we don't have a cookie yet, try /login/:name`).end()
});

app.get('*', function (req, res) {
  res.status(404).send(`404: Try /login/:name or /hello instead of here, please`);
});

app.listen(3334, () => {});