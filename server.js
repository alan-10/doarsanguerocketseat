//configurando o servidor
const express = require('express');
const server = express();



//configurar o servidor para apresentar arquivos estaticos
server.use(express.static('public'));

//habilitar body do formulario
server.use(express.urlencoded({extended: true}));


//configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./',{
    express:server,
    noCache: true
})


//lista de doadores: array
const donors = [
    {
        name:'Diego Fernandes',
        blood:'O+'
    },
    {
        name:'Alan Diniz',
        blood:'B+'
    },
    {
        name:'Inavir Diniz',
        blood:'O-'
    },
    {
        name:'Paulo Guedes',
        blood:'AB+'
    }
];


//configurar a apresentação da pagina
server.get('/', function(req, res){
    return res.render("index.html",{donors});
});

server.post('/', function(req, res){
    //pegar dados de formularios
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    donors.push({
        name: name,
        blood:blood
    });

    return res.redirect('/');
    
});


//ligar o servidor e e permitir o acesso a porta 3000
server.listen(3000, function(){
    console.log('iniciei o servidor');
});