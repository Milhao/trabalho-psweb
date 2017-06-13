function startDB(startType) {
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
		objectStore.createIndex('tel', 'tel', { unique : false});

		objectStore = active.createObjectStore('animal', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('idOwner', 'idOwner', { unique : false });
		objectStore.createIndex('name', 'name', { unique : false });
		objectStore.createIndex('raca', 'raca', { unique : false});
		objectStore.createIndex('idade', 'idade', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		objectStore = active.createObjectStore('produto', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('price', 'price', { unique : false});
		objectStore.createIndex('qtd', 'qtd', { unique : false});
		objectStore.createIndex('foto', 'foto', { unique : false});

		objectStore = active.createObjectStore('servico', { keyPath : 'id', autoIncrement : true });
		objectStore.createIndex('name', 'name', { unique : true });
		objectStore.createIndex('desc', 'desc', { unique : false });
		objectStore.createIndex('price', 'price', { unique : false});
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
		if(startType == 0){
			add({name: "Racão", desc: "Racão Pedigree adulto", price: "19,90", qtd: "10", foto: "prod1.jpg"},"produto");
			add({name: "Casinha", desc: "Casinha para cachorro", price: "29,90", qtd: "5", foto: "prod2.jpg"},"produto");
			add({name: "Brinquedo", desc: "Brinquedo para cachorro", price: "10,50", qtd: "20", foto: "prod3.jpg"},"produto");
			add({name: "Tosa", desc: "Tosa o animal", price: "39,90", foto: "tosa.jpeg"},"servico");
			add({name: "Banho", desc: "Banho no animal", price: "39,90", foto: "banho.png"},"servico");
			add({name: "Vacina", desc: "Aplica vacina no animal", price: "59,90", foto: "vacina.jpeg"},"servico");
			add({name: "Adm", email: "adm@email.com", password: "adm"},"adm");
			add({name: "Cliente", email: "cliente@email.com", password: "cliente"},"cliente");
		} else if(startType == 1)
			prodList();
		else if(startType == 2)
			servList();
		else if(startType == 3)
			animalList();
		else if(startType == 4)
			getEndereco();
		console.log("Database loaded")
	};

	dataBase.onerror = function (e) {
		console.log('Error loading database');
	};
}

function add(obj,className){
	let active = dataBase.result;
	let transaction = active.transaction([className], "readwrite");
	let objectStore = transaction.objectStore(className);

	let request = objectStore.put(obj);

	request.onerror = function (e) {
		console.log(request.error.name + '\n\n' + request.error.message);
	};

	transaction.oncomplete = function (e) {
		console.log('Cadastrado!');
	};
}