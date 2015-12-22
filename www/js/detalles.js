var nombre="";
var apellido="";
var telefono=0;
var profesion="";
var correo="";
var foto="";
var id="";
var db="";
var ultimos="";

var inicia = {

	/*PASO 5 : --> DETALLES, añadiendo el campo ultimos*/

	initialize: function(){
		//generamos el conector
		db=window.openDatabase("localDB","1.0","Base de datos de prueba",2*1024*1024);
		this.cargaDB();
	},
	cargaDB: function(){
		console.log("Cargamos la base de datos");
		db.transaction(this.mostrarDB,this.mostrarDBError);
	},
	mostrarDB: function(tx){
		id=window.localStorage.getItem("user_id");

		var sql="SELECT * FROM personas WHERE id='"+id+"';";
		console.log("Lanzamos la consulta");
		tx.executeSql(
			sql,
			[],
			//funcion de resultado OK
			function(tx,result){
				console.log("Se ha producido la consulta con exito");
				if(result.rows.length>0){
					for(var i=0;i<result.rows.length;i++){
						var fila=result.rows.item(i);
						nombre=fila.nombre;
						apellido=fila.apellidos;
						telefono=fila.telefono;
						profesion=fila.profesion;
						correo=fila.correo;
						foto=fila.foto;
						ultimos=fila.ultimos;
						//aqui actualizaria automaticamente el html
						console.log("ROW "+i+" nombre: "+fila.nombre);
						$("#nombre").append(nombre);
						$("#apellidos").append(apellido);
						$("#telefono").append(telefono);
						$("#profesion").append(profesion);
						$("#correo").append(correo);
						$("#imagen").attr("src",foto);
						$("#ultimos").append(ultimos);
					}
				}
			},

			//funcion de error
			function(tx,error){
				this.mostrarDBError(error);
			}
		);
	},

	mostrarDBError:function(err){
		console.log("Se ha producido un error en la creacion de la base de datos: "+error.code);
		console.log("Mensaje de error: "+err.message);
	}
};

inicia.initialize();

