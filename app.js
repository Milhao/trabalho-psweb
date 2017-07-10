const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDB = require('node-couchdb');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const couch = new NodeCouchDB({
	auth: {
		user: 'admin',
		password: 'admin'
	}
});


const dbName = 'amicao_db';
const userUrl = '_design/users/_view/get_user';
const servUrl = '_design/serv/_view/get_serv';

cadastrarPessoa = (type, req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	if(password === password2){
		couch.uniqid().then((ids) => {
			const id = ids[0];

			couch.insert(dbName, {
				_id: id,
				name: name,
				email: email,
				password: password,
				type: type
			}).then(
				(data, headers, status) => {
					res.redirect('/index-admin.html');
				},
				(err) => {
					res.send(err);
				}
			);
		});
	} else {
		res.redirect('/senhasDiferentes.html')
	}
}

cadastrarServicoProduto = (type, req, res) => {
	const name = req.body.name;
	const desc = req.body.desc;
	const price = req.body.price;
	let file = req.files.file;
	let qtd;
	if(type == "prod")
		qtd = req.body.qtd;
	file.mv(__dirname + '/images/' + file.name);
	couch.uniqid().then((ids) => {
	const id = ids[0];
		if(type == "prod")
			doc = {_id: id, name: name, desc: desc, price: price, qtd: qtd, file:file.name, type: type}
		else
			doc = {_id: id, name: name, desc: desc, price: price, file:file.name, type: type}
		couch.insert(dbName, doc).then(
			(data, headers, status) => {
				res.redirect('/index-admin.html');
			},
			(err) => {
				res.send(err);
			}
		);
	});
}

couch.listDatabases().then((dbs) => {
	console.log(dbs);
});

const app = express();

app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

app.post('/amicao_db/cadastrar_cliente', (req, res) => {
	cadastrarPessoa("client", req, res);
});

app.post('/amicao_db/cadastrar_administrador', (req, res) => {
	cadastrarPessoa("adm", req, res);
});

app.post('/amicao_db/cadastrar_produto', (req, res) => {
	cadastrarServicoProduto("prod", req, res);
});

app.post('/amicao_db/cadastrar_servico', (req, res) => {
	cadastrarServicoProduto("serv", req, res);
});

app.post('/amicao_db/editar_servico', (req, res) => {
	const name = req.body.name;
	
	couch.get(dbName, servUrl).then(({data, headers, status}) => {
		data.rows.forEach((serv) => {
			if (serv.value.name == name){
				res.cookie('serv', serv.value.name, {expire : new Date() + 1});
				res.render('editar-servico.html',{
					serv:serv
				});
			}
		});
	}, err => {
		res.send(err);
	});
});

app.post('/amicao_db/atualiza_servico/:id', (req, res) => {
	const id = req.params.id;
	const rev = req.body.rev;
	const name = req.body.name;
	const desc = req.body.desc;
	const price = req.body.price;
	let file;
	if(req.files.file)
		file = req.files.file.name;
	else
		file = req.body.filename;
	couch.update(dbName, {
		_id: id,
		_rev: rev,
		name: name,
		desc: desc,
		price: price,
		file: file
	}).then(({data, headers, status}) => {
		res.clearCookie('serv');
		res.redirect('/index-admin.html');
	}, err => {
		res.send(err);
	});
});

app.post('/amicao_db/deleta_servico/:id', (req, res) => {
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			res.clearCookie('serv');
			res.redirect('/index-admin.html');
		},
		function(err){
			res.send(err);
		});
});

app.post('/amicao_db/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	couch.get(dbName, userUrl).then(({data, headers, status}) => {
		data.rows.forEach((user) => {
			if (user.value.email == email){
				if(user.value.password == password){
					if(user.value.type == "adm")
						res.redirect('/index-admin.html');
					else
						res.cookie('type', user.value.type);
						res.redirect('/index.html');
				}
			}
		});
	}, err => {
		res.send(err);
	});
});

app.post('/amicao_db/logout', (req, res) => {
	res.clearCookie('type');
	res.redirect('/index.html');
});

app.listen(3000, function(){
 	console.log('Server Started On Port 3000');
})