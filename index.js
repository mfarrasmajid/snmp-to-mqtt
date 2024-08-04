"use strict";
const Broker = require("./src/event");
const SNMPServer = require("./src/snmp");
const MQTTServer = require('./src/mqtt');

const options = {
  address: "127.0.0.1",
  port: 162,
  version: "2c",
  transport: "udp4",
  trapPort: "162",
  timeout: "100000",
};

const initBroker = new Broker();
var broker = initBroker.initBroker();

var snmpClient = new SNMPServer(options, broker);
snmpClient.dummy_snmp_receiver();

console.log('Ready!');
