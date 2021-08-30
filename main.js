const http = require('http');
const views = require('./views');
// Codigo que levanta el servidor principal
const handleServer = function(req, res){ 

    // funcion dentro del archivo views.js que cumple la funcion de router
    views.fileSystem(req, res);
}

var servidor = http.createServer(handleServer);

servidor.listen(8080, function(){
    console.log("Escuchando en el puerto 8080");
});