const sequelize = require('./config/db.js');
const express = require('express');
const app = express();
app.use(express.json());

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB:', error);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listing on PORT 3000");
});