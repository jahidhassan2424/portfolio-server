const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.egywk.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));