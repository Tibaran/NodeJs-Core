const fs = require('fs');
const { parse } = require('querystring');
const path = require('path');
const fragmentos = require('./fragments');
const dedicado = require('./server-privado');
// Directorio publico
var dir = path.join(__dirname,"public");
//Tipos de contenido
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};
// Si entra a "/" entonces el servidor le devuelve el archivo bienvenida.html
const pages = {
    "/": "/bienvenida.html",
    "/nosotros": "/nosotros.html",
    "/contacto": "/contactanos.html",
    "/crea-tu-server": "/server-dedicado.html"
}

//Guarda los puertos ya usados, 8080 es el del server principal
let servidores = {
    "8080": "http://localhost:8080"
}

// Este viene a ser mi router donde, dependiendo de que url lanze el usuario le enviara el archivo correspondiente.
const fileSystem = (req, res) =>{
    var reqpath = req.url.toString().split('?')[0];
    if(pages[reqpath]){ //Si envia "/" reqpath toma el valor de "/bienvenida.html" para buscar ese archivo
        reqpath = pages[reqpath];
    }
    // Los siguientes son para controlar los POST del contactanos y el crear servidor
    if(req.url === '/contacto' && req.method === 'POST'){
        let capturado = '';
        collectRequestData(req, result=>{
            capturado +=`<!doctype html><html lang="en">${fragmentos.cabecera}<body>${fragmentos.navegacion}${fragmentos.jumbo}
            <!-- Mensaje --><div class="container my-5 justify-content-center text-center">
            <h3>Informacion enviada:</h3><hr>
            <div class="d-flex flex-column my-4">
            <div class="p-2"><p>Nombre: ${result.name}</p></div>
            <div class="p-2"><p>Correo: ${result.email}</p></div>
            <div class="p-2"><p>Numero: ${result.cellphone}</p></div>
            <div class="p-2"><p>Nacimiento: ${result.birthday}</p></div>
            <div class="p-2"><p>Mensaje: ${result.message}</p></div></div>
            </div>${fragmentos.pie}</body></html>`;
            res.setHeader('Content-type', 'text/html');
            return res.end(capturado);
        });
    }else if(req.url === '/crea-tu-server' && req.method === 'POST'){
        let capturado = '';
        collectRequestData(req, result=>{
            const puerto = result.port;
            if(servidores[puerto] || puerto.length >=5){
                res.setHeader('Content-Type', 'text/plain');
                return res.end(`El puerto ${puerto} ya se encuentra en uso o no es de 4 digitos`);
            }
            servidores[puerto] = `http://localhost:${puerto}`;
            dedicado.crearServerPrivado(result.name,result.port);
            capturado += `<!doctype html><html lang="en">${fragmentos.cabecera}<body>${fragmentos.navegacion}
            <div class="container"><h2>Tu servidor fue creado</h2><h3>Ingresa a: <a href="http://localhost:${puerto}">http://localhost:${puerto}</a></h3></div></body></html>`;
            res.setHeader('Content-type', 'text/html');
            return res.end(capturado);
        });

    } else {
        // Aqui se manejan los metodos GET, donde buscar en el directorio el archivo pasado por reqpath
        if (req.method !== 'GET') {
            res.statusCode = 501;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Method not implemented');
        }
        var file = path.join(dir, reqpath.replace(/\/$/, reqpath));
        if (file.indexOf(dir + path.sep) !== 0) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Forbidden');
        }
        var type = mime[path.extname(file).slice(1)] || 'text/plain';
        var s = fs.createReadStream(file);
        s.on('open', function () {
            res.setHeader('Content-Type', type);
            s.pipe(res);
        });
        s.on('error', function () {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Not found');
        });
    }
    
}
// Esta funcion recupera los parametros pasados por un metodo POST.
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', ()=>{
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

module.exports = {
    fileSystem
}