// kafka.js
const kafka = require('kafka-node');

// Setup the Kafka client connection to the broker
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Replace with your Kafka server address

// Create a Kafka producer to send messages
const producer = new kafka.Producer(client);

// Create a Kafka consumer to receive messages
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'chat-messages', partition: 0 }], // Replace 'chat-messages' with your topic name
  { autoCommit: true }
);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  console.error('Kafka Producer error:', error);
});

consumer.on('error', (error) => {
  console.error('Kafka Consumer error:', error);
});

module.exports = { producer, consumer };
