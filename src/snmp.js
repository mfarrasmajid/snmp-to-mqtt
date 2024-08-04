'use strict';

var snmp = require("net-snmp");

class SNMPServer {
    constructor(options, broker) {
        this.options = options;
        this.broker = broker;
    }

    dummy_snmp_receiver(){
        var vers = snmp.Version1;
        if (this.options.version == '2c'){
            vers = snmp.Version2c
        } else if (this.options.version == '3'){
            vers = snmp.Version3;
        }
        const options = {
            port: this.options.port,
            version: vers,
            // disableAuthorization: false,
            // includeAuthentication: false,
            // accessControlModelType: snmp.AccessControlModelType.None,
            // address: this.options.address,
            // transport: this.options.transport,
            // timeout: this.options.timeout,
        }
        var self = this;
        var callback = function (error, data) {
            if (error) {
                console.error(error);
            } else {
                // console.log(JSON.stringify(notification, null, 2));
                var varbinds = data.pdu.varbinds;
                for (var i = 0; i < varbinds.length; i++){
                    if (self.options.version == '2c'){
                        if (snmp.isVarbindError(varbinds[i])){
                            console.error(snmp.varbindError(varbinds[i]));
                        } else {
                            console.log(varbinds[i].oid);
                            if (
                              varbinds[i].type == snmp.ObjectType.OctetString
                            ) {
                              var value = new Buffer.from(
                                varbinds[i].value
                              ).toString("ascii");
                            //   console.log("Value: " + value);
                              self.broker.emit('receiver_response', value);
                            }
                        }
                    } else {
                        console.log(varbinds[i].oid);
                    }
                }
            }
        }

        var receiver = snmp.createReceiver(options, callback);
        console.log(`Waiting for input from ${this.options.address}...`);
        console.log(options);
    }

}

module.exports = SNMPServer;