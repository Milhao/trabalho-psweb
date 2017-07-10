/*
Alisson Mateus de Oliveira Magalhães    NºUSP: 8066287
Creunivar Toledo de Abreu				NºUSP: 3460973
Fábio Alves Martins Pereira             NºUSP: 7987435
Rafael Silva de Milhã					NºUSP: 8139701
*/

function cadastrarAdministrador(){
	name = document.getElementById('name').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	cpassword = document.getElementById('cpassword').value;
	if(name && email && password && cpassword){
		if(password == cpassword){
			adm = {name: name, email: email, password: password};
			add(adm,"adm");
			document.getElementById('name').value = "";
			document.getElementById('email').value = "";
			document.getElementById('password').value = "";
			document.getElementById('cpassword').value = "";
		} else {
			alert('As senhas devem ser iguais!');
		}
	}
}

function cadastrarCliente(){
	name = document.getElementById('name').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	cpassword = document.getElementById('cpassword').value;
	if(name && email && password && cpassword){
		if(password == cpassword){
			cliente = {name: name, email: email, password: password};
			add(cliente,"cliente");
			document.getElementById('name').value = "";
			document.getElementById('email').value = "";
			document.getElementById('password').value = "";
			document.getElementById('cpassword').value = "";
		} else {
			alert('As senhas devem ser iguais!');
		}
	}
}

function cadastrarProduto(){
	name = document.getElementById('name').value;
	desc = document.getElementById('desc').value;
	price = document.getElementById('price').value;
	qtd = document.getElementById('qtd').value;
	foto = document.getElementById('foto').value;
	produto = {name: name, desc: desc, price: price, qtd: qtd, foto: foto};
	if(name && desc && price>=0 && qtd >= 0 && foto){
		add(produto,"produto");
		document.getElementById('name').value = "";
		document.getElementById('desc').value = "";
		document.getElementById('price').value = "";
		document.getElementById('qtd').value = "";
		document.getElementById('foto').value = "";
	}
}

function cadastrarServico(){
	name = document.getElementById('name').value;
	desc = document.getElementById('desc').value;
	price = document.getElementById('price').value;
	foto = document.getElementById('foto').value;
	servico = {name: name, desc: desc, price: price, foto: foto};
	if(name && desc && price>=0 && foto){
		add(servico,"servico");
		document.getElementById('name').value = "";
		document.getElementById('desc').value = "";
		document.getElementById('price').value = "";
		document.getElementById('foto').value = "";
	}
}

function getServico(name){
	let request = dataBase.result.transaction(["servico"], "readonly").objectStore("servico").index("name").get(name);

	request.onsuccess = function () {
		if (request.result !== undefined) {
			document.getElementById('name').value = request.result.name;
			document.getElementById('desc').value = request.result.desc;
			document.getElementById('price').value = parseFloat(request.result.price);
		}
	}
}

function delServ(){
	name = document.getElementById('name').value;
	request = dataBase.result.transaction(["servico"], "readonly").objectStore("servico").index("name").get(name);
		request.onsuccess = function () {
			request1 = dataBase.result.transaction(["servico"], "readwrite").objectStore("servico").delete(request.result.id);
		}
	console.log("Servico removido!");
	window.location.assign("pesquisar-servico.html");
}

function editarProduto(){
	name = document.getElementById('name').value;
	if(name){
		 document.getElementById('prodArea').innerHTML = 	'<h1>Editar Produto</h1>\n\
															<div>\n\
																<input id="name" type="text" name="nome" placeholder="Nome"/>\n\
																<input id="desc" type="text" name="descricao" placeholder="Descrição"/>\n\
																<input id="price" type="number" name="preco" placeholder="Preço"/>\n\
																<input id="qtd" type="number" name="quantidade-estoque" placeholder="Quantidade no Estoque"/>\n\
																<p class="form-out-text">Selecione uma Foto </p>\n\
																<input id="foto" type="file" name="foto" accept="image/*"/>\n\
																<input class="submit-button" type="submit" value="Salvar Alterações" onclick="atualiza()"/>\n\
																<input class="submit-button" type="submit" value="Excluir Serviço" onclick="delProd()"/>\n\
															</div>';
		getProduto(name);
	}
}

function getProduto(name){
	let request = dataBase.result.transaction(["produto"], "readonly").objectStore("produto").index("name").get(name);

	request.onsuccess = function () {
		if (request.result !== undefined) {
			document.getElementById('name').value = request.result.name;
			document.getElementById('desc').value = request.result.desc;
			document.getElementById('price').value = parseFloat(request.result.price);
			document.getElementById('qtd').value = parseInt(request.result.qtd);
		}
	}
}

function delProd(){
	name = document.getElementById('name').value;
	request = dataBase.result.transaction(["produto"], "readonly").objectStore("produto").index("name").get(name);
		request.onsuccess = function () {
			request1 = dataBase.result.transaction(["produto"], "readwrite").objectStore("produto").delete(request.result.id);
		}
	console.log("Produto removido!");
	window.location.assign("pesquisar-produto.html");
}