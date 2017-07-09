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

const dbName = 'amicao_db';
const viewUrl = '_design/all_data/_view/all';

couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			console.log(data.data.rows);
			res.render('index',{
				amicao_db:data.data.rows
			});
		},
		function(err){
			res.send(err);
		});
});

app.post('/amicao_db/add', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	couch.uniqid().then(function(ids){
		const id = ids[0];

		couch.insert(dbName, {
			_id: id,
			name: name,
			email: email
		}).then(
			function(data, headers, status){
				res.redirect('/');
			},
			function(err){
				res.send(err);
			}
		);
	});
});

app.post('/amicao_db/delete/:id', function(req, res){
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			res.redirect('/');
		},
		function(err){
			res.send(err);
		});
});

app.listen(3000, function(){
 	console.log('Server Started On Port 3000');
})