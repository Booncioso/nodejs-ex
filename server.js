var net = require('net');
var mysql = require('mysql'); 

var server = net.createServer(function (socket) {
	//socket.write('Echo server\r\n');

	// socket is defined here and in scope
	socket.on('data', function (data) {

		//inserisce peers da client
		if (data != "gtPrs") {
			console.log("Prendo informazioni peers");
			//create sql info
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "",
				database: "peers"
			});
			//connect to sql
			con.connect(function (err) {
				if (err) throw err;
				//create query
				con.query("insert ", function (err, result, fields) {
					if (err) throw err;
				});
			});
			con.end();

		}
		console.log("esketit " + data);
		

		//prende peers da db
		if (data = "gtPrs") {
			console.log("Prendo informazioni peers");
			//create sql info
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "",
				database: "peers"
			});
			//connect to sql
			con.connect(function (err) {
				if (err) throw err;
				//create query
				con.query("SELECT * FROM list", function (err, result, fields) {
					socket.write(JSON.stringify(result));
					if (err) throw err;
				});
			});
			con.end()
			
		}
		console.log("esketit " + data);
		socket.pipe(socket);
		;
	});

});
server.listen(8008);