const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
// const rootDir = require('./util/path');
const port = 4000;
const cors = require('cors');
// const User = require('./models/user');
const userController = require('./controllers/admin');
const myDb = require('./util/database');


const app = express();
app.use(cors());
app.use(body_parser.json({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', userController.loadUserPage);

app.get('/getsinglecustomer', userController.getSingleCust); //fetch single customer

app.get('/get_customer', userController.getCustomers);  //fetch customers

app.post('/', userController.postAddCustomer);  //create customer

app.delete('/:id', userController.deleteCustomer);  // delete entries

app.put('/:id', userController.modifyCustomer); //edit entries


myDb.sync()//{force: true}
.then(()=>
{
    app.listen(port, ()=> console.log(`Server running at ${port}`));
});
    