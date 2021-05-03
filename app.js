const express = require('express');
const morgan = require('morgan');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use(require('./app/routes/employee.routes'));
app.use(require('./app/routes/user.routes'));
app.use(require('./app/routes/note.routes'));

app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});