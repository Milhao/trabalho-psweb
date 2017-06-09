function login(){
	password = document.getElementById('password').value;
	email = document.getElementById('email').value;

	var active = dataBase.result;
	var transaction = active.transaction(["cliente"], "readonly");
	var objectStore = transaction.objectStore("cliente");
	var index = objectStore.index("email");
	var request = index.get(email);
	
	request.onsuccess = function () {
		if (request.result !== undefined) {
			if(request.result.password !== password)
				alert("Senha errada!");
			else
				alert("Id: " + request.result.id + "\nNome: " + request.result.name + "\nE-mail: " + request.result.email);
		} else
			alert("E-mail não encontrado!");
	};

	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
}