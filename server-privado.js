// Esta es la funcion que llamamos para levantar los servidores dedicados.
const http = require('http');
const crearServerPrivado = (nombre ,puerto)=>{
    var servidor = http.createServer(function(req, res){
        res.setHeader('Content-type', 'text/html');
        res.end(`<h1>Este es tu servidor con nombre: ${nombre}, ubicado en el puerto: ${puerto}</h1>`);
    });
    servidor.listen(puerto);
}
module.exports = {
    crearServerPrivado
}