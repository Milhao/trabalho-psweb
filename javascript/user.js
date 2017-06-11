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
				alert("Comum")//deve gerar o cookie do usuario logado
				//alert("Id: " + request.result.id + "\nNome: " + request.result.name + "\nE-mail: " + request.result.email);
		} else {
			var transaction2 = active.transaction(["adm"], "readonly");
			var objectStore2 = transaction2.objectStore("adm");
			var index2 = objectStore2.index("email");
			var request2 = index2.get(email);

			request2.onsuccess = function () {
				if (request2.result !== undefined) {
					if(request2.result.password !== password)
						alert("Senha errada!");
					else
						window.location.assign("index-admin.html");
				} else
					alert("E-mail não encontrado!");
			};
		}
	};

	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
}