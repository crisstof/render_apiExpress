// Importer Express
const express = require('express');
//inclure le middleware cors il faut l'installer npm install cors  (npm list cors)
const cors = require('cors'); // Pour gérer les requêtes cross-origin

// Créer une instance d'Express
const app = express();

//PORT
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Activer CORS pour toutes les origines
app.use(cors());

// Données stockées en mémoire (remplacé par une base de données dans un vrai projet)
let dataStore = [];

// Route POST pour enregistrer des données
app.post('/api/data', (req, res) => {
    const newData = req.body; // Récupérer les données envoyées dans le corps de la requête
    if (!newData || (typeof newData.value !== 'string' && typeof newData.value !== 'number')) {
        return res.status(400).json({ error: "Le corps de la requête doit contenir un champ 'value' de type texte ou nombre." });
    }
    dataStore.push(newData.value); // Ajouter les données au tableau
    res.status(201).json({ message: "Donnée enregistrée avec succès.", data: newData.value });
});

// Route GET pour récupérer toutes les données
app.get('/api/data', (req, res) => {
    res.status(200).json({ data: dataStore });
});

// Démarrer le serveur

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});