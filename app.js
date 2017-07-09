const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDB = require('node-couchdb');

const couch = new NodeCouchDB({
	auth: {
		user: 'admin',
		password: 'admin'
	}
});

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

const dbName = 'amicao_db';
const userUrl = '_design/users/_view/get_user';

couch.listDatabases().then((dbs) => {
	console.log(dbs);
});

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
	couch.get(dbName, viewUrl).then(
		(data, headers, status) => {
			console.log(data.data.rows);
			res.render('index',{
				amicao_db:data.data.rows
			});
		},
		(err) => {
			res.send(err);
		});
});

/*app.post('/amicao_db/delete/:id', function(req, res){
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			res.redirect('/');
		},
		function(err){
			res.send(err);
		});
});*/

app.post('/amicao_db/cadastrar_cliente', (req, res) => {
	cadastrarPessoa("client", req, res);
});

app.post('/amicao_db/cadastrar_administrador', (req, res) => {
	cadastrarPessoa("adm", req, res);
});

app.post('/amicao_db/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	couch.get(dbName, userUrl).then(({data, headers, status}) => {
    	console.log(data.rows);
    	data.rows.forEach((user) => {
    		if (user.value.email == email){
    			console.log('User found! Type: ' + user.value.type);
    		}
    	});
	}, err => {
		res.send(err);
	});
});

app.listen(3000, function(){
 	console.log('Server Started On Port 3000');
})