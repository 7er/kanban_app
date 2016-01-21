require('./main.css');
var component = require('./component');
var app = document.createElement('div');

if (true) {
  throw "error";
}

document.body.appendChild(app);
app.appendChild(component());
