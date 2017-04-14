const express = require('express');

const app = express();

require('./libs/database').init();
require('./middlewares')(app);
require('./routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listen port', port));
