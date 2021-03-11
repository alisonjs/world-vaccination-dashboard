const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/world-vaccination-dashboard'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/world-vaccination-dashboard/'}),
);

app.listen(process.env.PORT || 8080);