function cadastrarAdministrador(){
	name = document.getElementById('name').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	cpassword = document.getElementById('cpassword').value;
	if(password == cpassword){
		adm = {name: name, email: email, password: password};
		alert(JSON.stringify(adm));
	} else {
		alert('As senhas devem ser iguais!');
	}
}

function cadastrarCliente(){
	name = document.getElementById('name').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	cpassword = document.getElementById('cpassword').value;
	if(password == cpassword){
		cliente = {name: name, email: email, password: password};
		alert(JSON.stringify(cliente));
	} else {
		alert('As senhas devem ser iguais!');
	}
}

function cadastrarProduto(){
	name = document.getElementById('name').value;
	desc = document.getElementById('desc').value;
	price = document.getElementById('price').value;
	qtd = document.getElementById('qtd').value;
	foto = document.getElementById('foto').value;
	produto = {name: name, desc: desc, price: price, qtd: qtd, foto: foto};
	alert(JSON.stringify(produto));
}

function cadastrarServico(){
	name = document.getElementById('name').value;
	desc = document.getElementById('desc').value;
	price = document.getElementById('price').value;
	foto = document.getElementById('foto').value;
	servico = {name: name, desc: desc, price: price, foto: foto};
	alert(JSON.stringify(servico));
}