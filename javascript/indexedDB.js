function startDB() {
	let dbName = "amicao";
	dataBase = indexedDB.open(dbName,1);
	dataBase.onupgradeneeded = function (e) {
	
		var active = dataBase.result;
		var objectStore = active.createObjectStore('adm', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('email', 'email', { unique : true});
		objectStore.createIndex('password', 'password', { unique : false});

		var objectStore = active.createObjectStore('cliente', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('email', 'email', { unique : true});
		objectStore.createIndex('password', 'password', { unique : false});

		var objectStore = active.createObjectStore('animal', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('idOwner', 'idOwner', { unique : false });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('raça', 'raça', { unique : false});
		objectStore.createIndex('idade', 'idade', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		var objectStore = active.createObjectStore('produto', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('preço', 'preço', { unique : false});
		objectStore.createIndex('qtd', 'qtd', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		var objectStore = active.createObjectStore('servico', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('preço', 'preço', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		var objectStore = active.createObjectStore('endereco', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('idCliente', 'idCliente', { unique : false });
		objectStore.createIndex('cep', 'cep', { unique : false });
		objectStore.createIndex('cidade', 'cidade', { unique : false });
		objectStore.createIndex('estado', 'estado', { unique : false});
		objectStore.createIndex('bairro', 'bairro', { unique : false});
		objectStore.createIndex('rua', 'rua', { unique : false});
		objectStore.createIndex('numero', 'numero', { unique : false});
		objectStore.createIndex('complemento', 'complemento', { unique : false});
		objectStore.createIndex('referencia', 'referencia', { unique : false});

	};
	dataBase.onsuccess = function (e) {
		console.log("Database loaded")
	};

	dataBase.onerror = function (e) {
		console.log('Error loading database');
	};
}

function addAdm(adm){
	var active = dataBase.result;
	var transaction = active.transaction(["adm"], "readwrite");
	var objectStore = transaction.objectStore("adm");

	var request = objectStore.put(adm);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Administrador cadastrado!');
	};
}

function addCliente(cliente){
	var active = dataBase.result;
	var transaction = active.transaction(["cliente"], "readwrite");
	var objectStore = transaction.objectStore("cliente");

	var request = objectStore.put(cliente);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Cliente cadastrado!');
	};
}

function addProduto(produto){
	var active = dataBase.result;
	var transaction = active.transaction(["produto"], "readwrite");
	var objectStore = transaction.objectStore("produto");

	var request = objectStore.put(produto);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Produto adicionado!');
	};
}

function addServico(servico){
	var active = dataBase.result;
	var transaction = active.transaction(["servico"], "readwrite");
	var objectStore = transaction.objectStore("servico");

	var request = objectStore.put(servico);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Serviço adicionado!');
	};
}