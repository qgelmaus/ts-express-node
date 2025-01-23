import express, { Request, Response, NextFunction } from 'express';


const app = express();
const port = 3000;

app.use(express.json());

type User = {
    id: number;
    name: string;
    age: number;

}



let users: User[] = [];

users.push({
    id: users.length + 1,
    name: 'John',
    age: 30
});

app.use('/users', (req, res, next)=> { 
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.use('/users', (req, res, next)=> {
    console.log('Time:', Date.now());
    next();
})

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

/* app.post('/users', (req: Request, res: Response) => {
    const {name, age} = req.body;

    if(!name || typeof age !== 'number') {
        return res.status(400).send('Invalid input');
    } 
    
    const newUser: User  = {
        id: users.length + 1,
        name,
        age
        };

    users.push(newUser);
    res.status(201).json(newUser);
});*/


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



