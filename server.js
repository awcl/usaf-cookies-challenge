//Create an Express application that sets a cookie when routed to /login with their name. If a cookie is present with a name key, then it says "Welcome {name}! when the user routes to /hello".
import express from 'express';
const app = express();
app.get('/login/:name', (req, res)  => {
  res.status(200).send(`${req.params.name}...I have to create a cookie on your machine if it doesn't already exist since you navigated here`).end();
})

app.get('/hello', (req, res)  => {
  res.status(200).send(`greet page placeholder`).end();
})

app.get('*', function (req, res) {
  res.status(404).send(`Try /login/NAME or /hello instead of here, please`);
})

app.listen(3334, () => {})