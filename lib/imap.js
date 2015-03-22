function startListening(port) {
    var net = require('net');
    var server = net.createServer(function (c) {
        console.log('An IMAP client just connected!');
    });

    server.listen(port);
}