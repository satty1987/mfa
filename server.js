const express = require('express');
const dotenv = require('dotenv');
// example to use router when required
const router = require('./routes/user.route');
dotenv.config();
require('./db/db');
const auth = require('./middleware/auth');
const morgan = require('morgan');
const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(auth);
app.use(cors());

app.use("/api", router);

app.get('/*', function (req, res) {
    res.send('hello multi factor');
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

app.listen(port, () => {
    console.log('Server is listening on ' + port);
});