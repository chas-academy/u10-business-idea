const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserController  = require('./controllers/Usercontroller');

const app = express();

const PORT = 8000;
const MongoDB = 'mongodb+srv://BabryzDev:1dJEwPdI0IxiLcT7@privatecluster-dfosw.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send('<h1>Hello from express</h1>');
})

app.get('/users/:userId', UserController.getById);

app.post('/register', UserController.store);


app.post('/login', UserController.login);

try {
	mongoose.connect(MongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(error)
}

app.listen(PORT, () => {
    console.log(`Listening on${PORT}`);
})