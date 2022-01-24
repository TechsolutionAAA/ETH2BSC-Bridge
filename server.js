const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

const bridge = require('./routes/api/bridge');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/bridge', bridge);
app.use(express.static(__dirname + '/client/build'));

app.get('/', () => {

})

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server running on port ${port}`));
