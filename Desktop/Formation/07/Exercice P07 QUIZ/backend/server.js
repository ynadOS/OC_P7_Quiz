
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Product = require('./models/product')

const app = require('./app')

app.use(bodyParser.json())

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://champloo63:<password>@cluster0.m7cs0z6.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à Mong<oDB échouée !'))

// GET : Récupérer tous les produits
app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.json({ products: products }))
        .catch(error => res.status(500).json({ message: error.message }));
});

// GET : Récupérer un produit par son ID
app.get('/api/products/:id', (req, res, next) => { 
    Product.findOne({ _id:req.params.id })
        .then(product => res.status(200).json({ product: product }))
        .catch(error => res.status(404).json({ error }));
});

// POST : Créer un nouveau produit
app.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    });

    product.save()
        .then(product => res.status(201).json({ product: product }))
        .catch(error => res.status(400).json({ error }));
});

// PUT : Mettre à jour un produit
app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié "}))
        .catch(error => res.status(400).json({ error }));
});

// DELETE : Supprimer un produit
app.delete('/api/products/:id', (req, res, next) => { 
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé"}))
        .catch(error => res.status(400).json({ error }))
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
