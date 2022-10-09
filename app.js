const express = require('express');
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./config/db.js');
const swaggerFile = require('./swagger_output.json')
const routes = require('./routes/index.routes.js');
const auth = require('./config/auth.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth.optional);

// Routes
app.use('/', routes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//await sequelize.sync({ force: true });

try {
    sequelize.authenticate();
    sequelize.sync({ force: true });
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB:', error);
}


app.listen(process.env['PORT'] || 3000, () => {
    console.log("Server listing on PORT "+ process.env['PORT'] );
});