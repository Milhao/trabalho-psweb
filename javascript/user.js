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
				window.location.assign("index-user.html");
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
		console.log(request.error.name + '\n\n' + request.error.message);
	};
}

function menu(){
	//if(logado){
		let ul = document.getElementById('menu');
		let li = document.createElement("li");
		let li_ul = document.createElement("ul");
		let li_ul_li1 = document.createElement("li");
		let li_ul_li2 = document.createElement("li");

		Animais = document.createElement("A");
		Cadastrar = document.createElement("A");
		Editar = document.createElement("A");
		Animais.innerHTML = "Animais";
		Cadastrar.innerHTML = "Cadastrar";
		Cadastrar.href = "cadastrar-animal.html";
		Editar.innerHTML = "Editar Dados";
		Editar.href = "listar-animal.html";

		li.appendChild(Animais);
		li_ul_li1.appendChild(Cadastrar);
		li_ul_li2.appendChild(Editar);
		ul.appendChild(li);
		li.appendChild(li_ul);
		li_ul.appendChild(li_ul_li1);
		li_ul.appendChild(li_ul_li2);

		li = document.createElement("li");
		li_ul = document.createElement("ul");
		li_ul_li1 = document.createElement("li");
		li_ul_li2 = document.createElement("li");
		li_ul_li3 = document.createElement("li");

		Dados = document.createElement("A");
		Editar = document.createElement("A");
		Endereco = document.createElement("A");
		Senha = document.createElement("A");
		Dados.innerHTML = "Dados Pessoais";
		Editar.innerHTML = "Editar";
		Editar.href = "editar-dados-pessoais.html";
		Endereco.innerHTML = "Endereço";
		Endereco.href = "editar-endereco.html";
		Senha.innerHTML = "Alterar Senha";
		Senha.href = "editar-senha.html";

		li.appendChild(Dados);
		li_ul_li1.appendChild(Editar);
		li_ul_li2.appendChild(Endereco);
		li_ul_li3.appendChild(Senha);
		ul.appendChild(li);
		li.appendChild(li_ul);
		li_ul.appendChild(li_ul_li1);
		li_ul.appendChild(li_ul_li2);
		li_ul.appendChild(li_ul_li3);
 	//}
}