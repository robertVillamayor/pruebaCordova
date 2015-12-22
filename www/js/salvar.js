var nombre="";
var apellido="";
var telefono=0;
var profesion="";
var correo="";
var foto="";

var db="";


function insertarDatos(tx){
	//insertamos valores de ejemplo
	sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto)"+
		"VALUES('"+nombre+"','"+apellido+"','"+telefono+"','"+profesion+"','"+correo+"','"+foto+"');";
	tx.executeSql(sql);
	console.log("ROW INSER: "+sql);	
};

function mostrarDBErrorSalvar(err){
	console.log("Se ha producido un error en la busqueda de la base de datos: "+err.code);
	console.log("MENSAJE DE ERROR: "+err.message);
};

$("#salvar").click(
	function(event){
		console.log("NUEVO ELEMENTO PERSONA");
		nombre=$("#nombre").val();
		apellido=$("#apellidos").val();
		telefono=$("#telefono").val();
		profesion=$("#profesion").val();
		correo=$("#correo").val();

		//conexion con base de datos
		db=window.openDatabase("localDB","1.0","Base de datos de prueba",2*1024*1024);
		db.transaction(insertarDatos,mostrarDBErrorSalvar);

	}
);

function mostrarImagen(imageURI){
	foto = imageURI;
	console.log("IMAGEN: "+imageURI);

	$("#imagenLista").attr("src",imageURI);

};

function errorImagen(message){
	console.log("MENSAJE DE ERROR: "+message);
};


$("#imagenLista").click(
		function(event){
			navigator.camera.getPicture(
				mostrarImagen,
				errorImagen,
				{ quality: 50,destinationType: Camera.DestinationType.FILE_URI}
			);
		}
	);



