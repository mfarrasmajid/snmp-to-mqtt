"use strict";
const EventEmitter = require("events");
const MQTTServer = require('./mqtt');

class Broker {
  constructor() {}

  initBroker() {
    var broker = new EventEmitter();
    const config = {
      hostname: "localhost",
      port: 1883,
    };
    broker.on("receiver_response", function sendMQTT(value) {
      var mqttServer = new MQTTServer();
      mqttServer.sendMQTT(config, value);
    });

    return broker;
  }
}

module.exports = Broker;
