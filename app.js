const express = require('express');
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./config/db.js');
const swaggerFile = require('./swagger_output.json')
const routes = require('./routes/index.routes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB:', error);
}


app.listen(process.env['PORT'] || 3000, () => {
    console.log("Server listing on PORT "+ process.env['PORT'] );
});