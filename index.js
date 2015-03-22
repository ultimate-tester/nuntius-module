/* REQUIRES */
var smtp = require('./lib/smtp');

/* FUNCTIONS */
module.exports = {
    startSMTP: function (port) {
        smtp.start(port);
    },

    stopSMTP: function () {
        smtp.stop();
    }

    /*startPOP: function (port) {
     var pop = require('lib/pop');
     pop.startListening(port);
     },

     startIMAP: function (port) {
     var imap = require('lib/imap');
     imap.startListening(port);
     }*/
};