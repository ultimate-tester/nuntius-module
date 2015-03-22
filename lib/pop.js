function startListening(port) {
    var net = require('net');
    var server = net.createServer(function (c) {
        console.log('A POP3 client just connected!');
    });

    server.listen(port);
}