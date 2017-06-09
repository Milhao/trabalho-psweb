function login(){
	password = document.getElementById('password').value;
	email = document.getElementById('email').value;

	var active = dataBase.result;
	var data = active.transaction(["cliente"], "readonly");
	var object = data.objectStore("cliente");
		
	var request = object.get(String(email));
	
	request.onsuccess = function () {
	
		var result = request.result;

		if (result !== undefined) {
			alert("Nome: " + result.name + "\n\
			E-mail: " + result.email);
		}
	};

	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
}