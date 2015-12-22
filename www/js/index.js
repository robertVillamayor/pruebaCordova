
var cargarDB = {
    db:"",
    initialize: function(){
        //generamos el conector
        this.db=window.openDatabase("localDB","1.0","Base de datos de prueba",2*1024*1024);
        this.cargaDB();
    },
    cargaDB:function() {
        console.log("Cargamos la base de datos");
        this.db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        var sql="SELECT * FROM personas ORDER BY ultimos DESC"; /*PASO 4 : --> En primer lugar los ultimos contactos */
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            //Funcion de resultado Ok
            function(tx,result){
                console.log("Se ha producido la consulta con exito");
                if(result.rows.length>0){
                    for(var i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);
                        //Aqui actualizaria automaticamente mi html
                        $("#ejemploLista ul").append("<li id='"+fila.id+"' class='listaUsers'><a href='detalles.html' data-ajax='false'><img src='"+fila.foto+"'  width='80px' height='80px'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesionLista'>"+fila.profesion+"</div></a></li>").listview('refresh');
                    }
                }

                //guardamos la id en el localStorage
                $(document).ready(
                    function(){
                         $('.listaUsers').click(
                            function(){
                                var id=$(this).attr("id");
                                window.localStorage.setItem("user_id",id);
                            }
                         );
                     }
                 );
            },

            //Funcion de error
            function(tx,error){
                this.mostrarDBError(error);
            }
        );
    },
    mostrarDBError:function(err){
        console.log("Se ha producido un error en la creacion de la base de datos: "+err.code);
        console.log("MENSAJE DE ERROR: "+err.message);
    }
};

var confDB = {
    existe_db:"",
    db:"",
    initialize: function(){
        //variable existe db
        console.log("Nos conectamos");
        this.existe_db=window.localStorage.getItem("existe_db");
        //Creamos un enlace con la base de datos(nombre,version,descriptivo,tamaño estimado)
        this.db=window.openDatabase("localDB","1.0","Base de datos de prueba",2*1024*1024);
        //Nos preguntamos si es necesario crear la base de datos
        console.log("Variable existe db: "+this.existe_db);
        if(this.existe_db==null){
            console.log("No existe ninguna base de datos");
            this.createDB();
        }else{
            //Base de datos creada
            cargarDB.initialize();

        }
    },
    createDB:function() {
        console.log("Creamos la base de datos");
        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBOkey);
    },
    createLocalDB:function(tx){
       console.log("BIEN1");
       tx.executeSql("DROP TABLE IF EXISTS personas");
       console.log("BIEN2");

       var sql="CREATE TABLE IF NOT EXISTS personas ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                "nombre VARCHAR(50),"+
                "apellidos VARCHAR(256),"+
                "telefono INT(9),"+
                "profesion VARCHAR(50),"+
                "correo VARCHAR(50),"+
                "foto VARCHAR(250),"+
                "ultimos INTEGER(1) CHECK (ultimos >=0 and ultimos <=1));"; /*PASO 2 : --> Nuevo campo int con la condicion
                                                                              de aceptar solo 0 o 1*/

        tx.executeSql(sql);
        console.log("BIEN3");

        /*PASO 3 : --> Insertamos datos en la tabla personas*/

        sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Robert','Villamayor Pastor','689052773','Estudiante','robertpika268@gmail.com','',0);";
        tx.executeSql(sql);

         sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Pedro','Rodriguez Valbuena','685478512','Estudiante','pedromac@gmail.com','',0);";
        tx.executeSql(sql);

         sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Juan','Diaz Pasmi','658974256','Estudiante','juanjuan@gmail.com','',0);";
        tx.executeSql(sql);

         sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Tomas','Perez Gastaldo','678787596','Estudiante','tomasitoperez@gmail.com','',0);";
        tx.executeSql(sql);

         sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Mireria','Delegido Lorenzo','689052773','Estudiante','ainarita@gmail.com','',0);";
        tx.executeSql(sql);

         sql="INSERT INTO personas(nombre,apellidos,telefono,profesion,correo,foto,ultimos)"+
        "VALUES ('Pepito','Ramirez Genis','698584258','Estudiante','pepepepito@gmail.com','',0);";
        tx.executeSql(sql);

         /*PASO 2 : --> Actualizamos la tabla para poner ultimos a 1 en los tres ultimos registros*/
        sql = "UPDATE personas SET ultimos = 1 WHERE id IN (SELECT id from personas ORDER BY id DESC LIMIT 3);";
        tx.executeSql(sql);

         

    },
    createDBError:function(err){
        console.log("Se ha generado un error en la base de datos"+err.code);
        console.log("MENSAJE DE ERROR "+err.message);
        console.log("BIEN6");
    },
    createDBOkey:function(){
        console.log("Se ha generado la base de datos con éxito");
        window.localStorage.setItem("existe_db",1);
        console.log("BIEN7");
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //Lanzamos la configuracion de la base de datos
        console.log("Dispositivo listo");
        confDB.initialize();
    } 
};

app.initialize();