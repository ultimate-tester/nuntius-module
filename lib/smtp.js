/* REQUIRES */
var net = require('net');

/* VARIABLES */
var server;

/* FUNCTIONS */
module.exports = {
    start: function (port) {
        function setClientDefaults(c) {
            c.setEncoding('utf8');
            c.setTimeout(5000);
        }

        function constructResponse(code) {
            var message = code;
            for (var i = 1; i != arguments.length; i++) {
                message += (' ' + arguments[i]);
            }

            console.log(message);

            return message + '\r\n';
        }

        function extractRequest(request) {
            request = request.replace(/(\r|\n)+$/g, 'yay');
            return request.split(' ');
        }

        function sendGreeting(c) {
            c.write(constructResponse(220, 'localhost', 'Nuntius'), function () {
                console.log('Greetings to client ' + c.remoteAddress);
            });
        }

        server = net.createServer(function (c) {
            var greeted = false;
            var clientSupportsExtensions = false;
            var dataMode = false;
            var collectedData = '';

            setClientDefaults(c);
            sendGreeting(c);

            c.on('data', function (d) {
                if (dataMode == true) {
                    collectedData += d;
                    var endOfData = d.indexOf('\r\n.\r\n');
                    if (endOfData != -1) {
                        collectedData = collectedData.substr(0, endOfData);
                        c.write(constructResponse(250, 'OK'));
                        dataMode = false;
                        return;
                    }
                }

                var request = extractRequest(d);
                console.log(request);

                if (request[0] != 'HELO' && request[0] != 'EHLO') {
                    if (greeted == false) {
                        c.end(constructResponse(503, 'Greet me first'));
                        return;
                    }
                }

                /* TODO: Replace switch with a better way to process commands */
                switch (request[0]) {
                    case 'HELO':
                        greeted = true;
                        c.write(constructResponse(250, 'localhost'));
                        break;
                    case 'EHLO':
                        greeted = true;
                        clientSupportsExtensions = true;
                        c.write(constructResponse(250, 'localhost'));
                        break;
                    case 'MAIL':
                        /* TODO: Implement MAIL */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'RCPT':
                        /* TODO: Implement RESET */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'RSET':
                        /* TODO: Implement RESET */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'SEND': // Deliver to Terminal only
                        /* TODO: Implement SEND */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'SOML': // Deliver to Terminal OR Mailbox
                        /* TODO: Implement SOML */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'SAML': // Deliver to Terminal AND Mailbox
                        /* TODO: Implement SAML */
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'DATA':
                        /* TODO: Implement DATA */
                        dataMode = true;
                        c.write(constructResponse(354, 'Start mail input; end with <CRLF>.<CRLF>'));
                        break;
                    case 'NOOP':
                        c.write(constructResponse(250, 'OK'));
                        break;
                    case 'QUIT':
                        c.end(constructResponse(221, 'Goodbye'));
                        break;
                    default:
                        c.end(constructResponse(502, 'Command not implemented'));
                        break;
                }
            });

            c.on('timeout', function () {
                c.end('Timeout, goodbye!');
            });

            c.on('end', function () {
                c.end('End, goodbye!');
            });
        });

        server.listen(port);
    },

    stop: function () {
        server.close();
    }
};