function startDB() {
	let dbName = "amicao";
	dataBase = indexedDB.open(dbName,1);
	dataBase.onupgradeneeded = function (e) {
	
		var active = dataBase.result;
		var object = active.createObjectStore('adm', { keyPath : 'id', autoIncrement : true });
		object.createIndex('name', 'name', { unique : false });
		object.createIndex('email', 'email', { unique : true});
		object.createIndex('password', 'password', { unique : false});

		var object = active.createObjectStore('cliente', { keyPath : 'id', autoIncrement : true });
		object.createIndex('name', 'name', { unique : false });
		object.createIndex('email', 'email', { unique : true});
		object.createIndex('password', 'password', { unique : false});

		var object = active.createObjectStore('animal', { keyPath : 'id', autoIncrement : true });
		object.createIndex('idOwner', 'idOwner', { unique : false });
		object.createIndex('name', 'name', { unique : false });
		object.createIndex('raça', 'raça', { unique : false});
		object.createIndex('idade', 'idade', { unique : false});
		object.createIndex('foto', 'foto', { unique : false});

		var object = active.createObjectStore('produto', { keyPath : 'id', autoIncrement : true });
		object.createIndex('name', 'name', { unique : false });
		object.createIndex('desc', 'desc', { unique : false });
		object.createIndex('preço', 'preço', { unique : false});
		object.createIndex('qtd', 'qtd', { unique : false});
		object.createIndex('foto', 'foto', { unique : false});

		var object = active.createObjectStore('servico', { keyPath : 'id', autoIncrement : true });
		object.createIndex('name', 'name', { unique : false });
		object.createIndex('desc', 'desc', { unique : false });
		object.createIndex('preço', 'preço', { unique : false});
		object.createIndex('foto', 'foto', { unique : false});

		var object = active.createObjectStore('endereco', { keyPath : 'id', autoIncrement : true });
		object.createIndex('idOwner', 'idOwner', { unique : false });
		object.createIndex('cep', 'cep', { unique : false });
		object.createIndex('cidade', 'cidade', { unique : false });
		object.createIndex('estado', 'estado', { unique : false});
		object.createIndex('bairro', 'bairro', { unique : false});
		object.createIndex('rua', 'rua', { unique : false});
		object.createIndex('numero', 'numero', { unique : false});
		object.createIndex('complemento', 'complemento', { unique : false});
		object.createIndex('referencia', 'referencia', { unique : false});

	};
	dataBase.onsuccess = function (e) {
		alert('Database loaded');
	};
		
	dataBase.onerror = function (e) {
		alert('Error loading database');
	};
}

function addAdm(adm){
	var active = dataBase.result;
	var data = active.transaction(["adm"], "readwrite");
	var object = data.objectStore("adm");
	
	var request = object.put(adm);
	
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	
	data.oncomplete = function (e) {
		alert('Administrador cadastrado!');
	};
}

function addCliente(cliente){
	var active = dataBase.result;
	var data = active.transaction(["cliente"], "readwrite");
	var object = data.objectStore("cliente");
	
	var request = object.put(cliente);
	
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	
	data.oncomplete = function (e) {
		alert('Cliente cadastrado!');
	};
}

function addProduto(produto){
	var active = dataBase.result;
	var data = active.transaction(["produto"], "readwrite");
	var object = data.objectStore("produto");
	
	var request = object.put(produto);
	
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	
	data.oncomplete = function (e) {
		alert('Produto adicionado!');
	};
}

function addServico(servico){
	var active = dataBase.result;
	var data = active.transaction(["servico"], "readwrite");
	var object = data.objectStore("servico");
	
	var request = object.put(servico);
	
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	
	data.oncomplete = function (e) {
		alert('Serviço adicionado!');
	};
}