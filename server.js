// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res, next) {
    // eslint-disable-next-line no-undef
    res.sendFile(path.join(__dirname, '/dist/index.html'))
});

app.listen(PORT, function () {
    console.log(`App started on http://localhost:${PORT}/!`);
});