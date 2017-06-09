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
		alert('Cadastro efetuado com sucesso!');
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
		alert('Cadastro efetuado com sucesso!');
	};
}