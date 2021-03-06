// Son fragmentos de html para la pagina principal, para cuando tenga que crear un html en el res.end() o res.write()
const cabecera = 
`
<head>
    <title>InfoSolutions</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
`;
const navegacion = 
`
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
<a class="navbar-brand" href="/">Inicio</a>
<button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
    aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
            <a class="nav-link" href="/nosotros">Nosotros<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="/contacto">Contactanos</a>
        </li>
    </ul>
</div>
</nav>
`;
const jumbo =
`
<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Gracias por contactarnos</h1>
        <p class="lead">Muy pronto nos pondremos en contacto</p>
    </div>
</div>
`;

const pie = 
`
<!-- Footer -->
<footer class="p-4 bg-dark" style="color:white">
    <div class="d-flex justify-content-center text-center">
        <div class="row">
            <div class="col"><p>Pagina desarrollada por InfoSolutions</p><div>
        </div>
        <div class="row">
            <div class="col"><p>Desarrollado con: Nodejs Core</p><div>
        </div>
        <div class="row">
            <div class="col"><p>Dueño: Tibaran</p><div>
        </div>
    </div>
</footer>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
`;

module.exports = {
    cabecera,
    navegacion,
    jumbo,
    pie
}