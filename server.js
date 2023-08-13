require("dotenv").config();
const { uri } = process.env;
const express = require('express');
const app = express();
const { connect } = require('mongoose');
const Product = require('./models/productModel');

//tells the app what middleware to use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
    res.send('Hello Node API!');
});

app.get('/blog', (req, res) => {
    res.send('Hello blog, my name is Sammi!');
});

//retrieve all data from database
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});

//retrieve singular data from database
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});

//save data to database
app.post('/products', async (req, res) => {
    try {
        const products = await Product.create(req.body);
        return res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});

//update data in the database
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        const updatedProduct = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product by ${id} id!` });
        } else {
            return res.status(200).json(updatedProduct);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});

//delete data from database
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product by ${id} id!` });
        } else {
            return res.status(200).json(product);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
})

//connect to database
connect(uri).then(() => {
    console.log('Successfully logged into database!');

    //run the API
    app.listen(3000, () => {
        console.log('Node API is running on port 3000 successfully!');
    });
}).catch((err) => {
    console.error(err);
});