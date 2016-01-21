require('./main.css');
import component from './component';
var app = document.createElement('div');

if (false) {  
  throw "error";
}

document.body.appendChild(app);
app.appendChild(component());
