"use strict";
const mqtt = require("mqtt");

class MQTTServer {
  constructor() {}

  testMQTT() {
    const client = mqtt.connect("mqtt://test.mosquitto.org");

    client.on("connect", () => {
      client.subscribe("presence", (err) => {
        if (!err) {
          client.publish("presence", "Hello mqtt");
        }
      });
    });

    client.on("message", (topic, message) => {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  }

  connectMQTT(options) {
    return mqtt.connectAsync(options);
  }

  async sendMQTT(options, value) {
    const client = await mqtt.connectAsync(options);

    client.on("connect", () => {
      client.publish("test", value);
      console.log('Message sent to MQTT!');
      client.end();
    });
  }
}

module.exports = MQTTServer;