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