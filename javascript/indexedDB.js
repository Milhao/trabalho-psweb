function startDB() {
	let dbName = "amicao";
	dataBase = indexedDB.open(dbName,1);
	dataBase.onupgradeneeded = function (e) {
		let active = dataBase.result;
		let objectStore = active.createObjectStore('adm', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('email', 'email', { unique : true});
		objectStore.createIndex('password', 'password', { unique : false});

		objectStore = active.createObjectStore('cliente', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('email', 'email', { unique : true});
		objectStore.createIndex('password', 'password', { unique : false});

		objectStore = active.createObjectStore('animal', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('idOwner', 'idOwner', { unique : false });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('raça', 'raça', { unique : false});
		objectStore.createIndex('idade', 'idade', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		objectStore = active.createObjectStore('produto', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('preço', 'preço', { unique : false});
		objectStore.createIndex('qtd', 'qtd', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		objectStore = active.createObjectStore('servico', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('preço', 'preço', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		objectStore = active.createObjectStore('endereco', { keyPath : 'id', autoIncrement : true });
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
		prodList();
		addProduto({name: "Ração", desc: "Ração Pedigree adulto", price: "19,90", qtd: "10", foto: "prod1.jpg"});
		addProduto({name: "Casinha", desc: "Casinha para cachorro", price: "29,90", qtd: "5", foto: "prod2.jpg"});
		addProduto({name: "Brinquedo", desc: "Brinquedo para cachorro", price: "10,50", qtd: "20", foto: "prod3.jpg"});
		addAdm({name: "Adm", email: "adm@email.com", password: "adm"});
		console.log("Database loaded")
	};

	dataBase.onerror = function (e) {
		console.log('Error loading database');
	};
}

function addAdm(adm){
	let active = dataBase.result;
	let transaction = active.transaction(["adm"], "readwrite");
	let objectStore = transaction.objectStore("adm");

	let request = objectStore.put(adm);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Administrador cadastrado!');
	};
}

function addCliente(cliente){
	let active = dataBase.result;
	let transaction = active.transaction(["cliente"], "readwrite");
	let objectStore = transaction.objectStore("cliente");

	let request = objectStore.put(cliente);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Cliente cadastrado!');
	};
}

function addProduto(produto){
	let active = dataBase.result;
	let transaction = active.transaction(["produto"], "readwrite");
	let objectStore = transaction.objectStore("produto");

	let request = objectStore.put(produto);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Produto adicionado!');
	};
}

function addServico(servico){
	let active = dataBase.result;
	let transaction = active.transaction(["servico"], "readwrite");
	let objectStore = transaction.objectStore("servico");

	let request = objectStore.put(servico);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Serviço adicionado!');
	};
}