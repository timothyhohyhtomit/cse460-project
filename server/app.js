import express from 'express';
import cors from "cors";
import orderRouter from './routers/orderRouter.js';
import menuRouter from './routers/menuRouter.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

/*
Since we have a small number of routes, we are not going to create spearate routers. All routes handled in app.js
*/

// Until integrating with the database, hardcode user credentials
const credentials = {
    "operator": {
        password: "operator",
        role: "operator"
    },
    "manager": {
        password: "manager",
        role: "manager"
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// login
app.post('/login', (req, res) => {
    console.log("app.js received /login request");
    // extract username and password from request body
    const { username, password } = req.body;
    // check if username exists and password matches
    if (username in credentials && credentials[username].password === password) {
        res.status(200).json({
            username,
            role: credentials[username].role
        });
    } else {
        res.status(401).json({
            error: "Invalid username or password"
        });
    }
});

// routers
app.use("/order", orderRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
