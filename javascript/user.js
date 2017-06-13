function isLogged(){
	if(0)
		return 1;
	return 0;
}

function login() {
	password = document.getElementById('password').value;
	email = document.getElementById('email').value;

	let active = dataBase.result;
	let transaction = active.transaction(["cliente"], "readonly");
	let objectStore = transaction.objectStore("cliente");
	let index = objectStore.index("email");
	let request = index.get(email);
			
	request.onsuccess = function () {
		if (request.result !== undefined) {
			if(request.result.password !== password)
				alert("Senha errada!");
			else{
				window.location.assign("index.html");
			}
		} else {
			let transaction2 = active.transaction(["adm"], "readonly");
			let objectStore2 = transaction2.objectStore("adm");
			let index2 = objectStore2.index("email");
			let request2 = index2.get(email);

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

function menu(logado){
	let outerHTML = '';
	if(logado){
		outerHTML = '<a href="index.html"><img id="petshop-logo" src="../images/petshop-logo-half-white.png" alt="Logo Petshop"/></a>\n\
					<ul>\n\
						<li><a href="listar-produtos.html">Produtos</a></li>\n\
						<li><a href="servico.html">Serviços</a></li>\n\
						<li><a href="">Animais</a>\n\
							<ul>\n\
								<li><a href="cadastrar-animal.html">Cadastrar</a></li>\n\
								<li><a href="listar-animal.html">Editar Dados</a></li>\n\
							</ul>\n\
						</li>\n\
						<li><a href="">Dados Pessoais</a>\n\
							<ul>\n\
								<li><a href="editar-dados-pessoais.html">Editar</a></li>\n\
								<li><a href="editar-endereco.html">Endereço</a></li>\n\
								<li><a href="editar-senha.html">Alterar Senha</a></li>\n\
							</ul>\n\
						</li>\n\
					</ul>\n\
					<a href="carrinho.html"><img id="shop-cart" src="../images/shopping-cart.png" alt="Carrinho de Compras"/></a>';
		document.getElementById('menu').innerHTML = outerHTML;
	} else {
		outerHTML = '<a href="index.html"><img id="petshop-logo" src="../images/petshop-logo-half-white.png" alt="Logo Petshop"/></a>\n\
					<ul>\n\
						<li><a href="listar-produtos.html">Produtos</a></li>\n\
						<li><a href="servico.html">Serviços</a></li>\n\
					</ul>\n\
					<form class="login-form" action="" method="POST">\n\
						<input id="email" class="login-input" type="email" name="email" placeholder="E-mail"/>\n\
						<input id="password" class="login-input" type="password" name="password" placeholder="Senha"/>\n\
						<input class="login-input login-button"class="login-button" class="" type="submit" value="Entrar" onclick="login()"/>\n\
					</form>';
		document.getElementById('menu').innerHTML = outerHTML;
 	}
}

function prodList(){
	let active = dataBase.result;
	let transaction = active.transaction(["produto"], "readonly");
	let objectStore = transaction.objectStore("produto");

	let produtos = [];

	objectStore.openCursor().onsuccess = function (e) {
		let result = e.target.result;
		if (result === null) {
			return;
		}
		produtos.push(result.value);
		result.continue();
	};

	transaction.oncomplete = function() {
		let outerHTML = '';
		for (let key in produtos) {
			outerHTML += '\n\
							<section class="image-container">\n\
								<a href="detalhes-produto.html">\n\
									<img class="foto" src="..\\images\\' + produtos[key].foto.split("\\").slice(-1)[0] + '">\n\
									<p>' + produtos[key].name + '</p>\n\
								</a>\n\
							</section>';
		}
		produtos = [];
		document.getElementById("prodList").innerHTML = '<h1>Produtos</h1>' + outerHTML;
	};
}

function servList(){
	let active = dataBase.result;
	let transaction = active.transaction(["servico"], "readonly");
	let objectStore = transaction.objectStore("servico");

	let servicos = [];

	objectStore.openCursor().onsuccess = function (e) {
		let result = e.target.result;
		if (result === null) {
			return;
		}
		servicos.push(result.value);
		result.continue();
	};

	transaction.oncomplete = function() {
		let outerHTML = '';
		for (let key in servicos) {
			outerHTML += '\n\
							<section class="image-container">\n\
								<a href="reservar-horario.html">\n\
									<img class="list-image" src="..\\images\\' + servicos[key].foto.split("\\").slice(-1)[0] + '" alt="Mr. Schwibbles">\n\
								</a>\n\
								<p class="price">' + servicos[key].name + '</p>\n\
								<p class="price">Preço: <span style="color:black">' + servicos[key].price + '</span></p>\n\
							</section>';
		}
		servicos = [];
		document.getElementById("servList").innerHTML = '<h1>Serviços Disponíveis</h1>' + outerHTML;
	};
}