// const express = require('express');
// const { KafkaClient, Producer, Consumer } = require('kafka-node');
// const app = express();  
// app.use(express.json());

// const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new Producer(kafkaClient);

// app.post('/send-message', (req, res) => {
//   const { message } = req.body;
//   console.log('Received message:', message); // Log the message for debugging

//   const payloads = [{
//     topic: 'chat-messages',
//     messages: typeof message === 'string' ? message : JSON.stringify(message)
//   }];

//   producer.send(payloads, (err, data) => {
//     if (err) {
//       console.error('Error sending message to Kafka:', err);
//       res.status(500).send('Error sending message to Kafka');
//     } else {
//       console.log('Message sent to Kafka:', data); // Log the response data
//       res.status(200).send('Message sent to Kafka');
//     }
//   });
// });


// // Helper function to check if a string is valid JSON
// function isJsonString(str) {
//   try {
//     JSON.parse(str);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

// // Function to process different types of messages
// function handleReceivedMessage(messageContent) {
//   // Check if the message is JSON
//   if (isJsonString(messageContent)) {
//     const parsedMessage = JSON.parse(messageContent);

//     // Check if parsedMessage is an object with nested JSON
//     if (typeof parsedMessage === 'object' && !Array.isArray(parsedMessage)) {
//       console.log('Received JSON Object:', parsedMessage);

//       // Handle each key-value pair in the JSON object
//       for (const key in parsedMessage) {
//         if (typeof parsedMessage[key] === 'object') {
//           console.log(`Nested JSON for key "${key}":`, parsedMessage[key]);
//         } else {
//           console.log(`Key "${key}" has value:`, parsedMessage[key]);
//         }
//       }
//     } else {
//       console.log('Received JSON array or simple JSON:', parsedMessage);
//     }
//   } else {
//     // If it's plain text
//     console.log('Received plain text message:', messageContent);
//   }
// }

// // Kafka consumer setup
// const consumer = new Consumer(
//   kafkaClient,
//   [{ topic: 'chat-messages', partition: 0 }],
//   { autoCommit: true }
// );

// consumer.on('message', (message) => {
//   const messageContent = message.value;
//   console.log('Raw message received from Kafka:', messageContent);
//   handleReceivedMessage(messageContent);
// });

// consumer.on('error', (error) => {
//   console.error('Kafka Consumer error:', error);
// });

// app.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });



// server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const kafka = require('kafka-node');
// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(bodyParser.json());

// // Kafka setup
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new kafka.Producer(client);

// producer.on('ready', () => {
//   console.log('Kafka Producer is connected and ready.');
// });

// producer.on('error', (err) => {
//   console.error('Kafka Producer error:', err);
// });

// // Route to send message to Kafka
// app.post('/send-message', (req, res) => {
//   const message = req.body.message;

//   const payloads = [{ topic: 'chat-messages', messages: JSON.stringify(message) }];
//   producer.send(payloads, (err, data) => {
//     if (err) {
//       console.error('Error sending message to Kafka:', err);
//       return res.status(500).send('Failed to send message to Kafka');
//     } else {
//       console.log('Message sent to Kafka:', data);
//       return res.status(200).send('Message sent to Kafka successfully');
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });














// const express = require("express");
// const cors = require("cors");
// const { KafkaClient, Producer, Consumer } = require("kafka-node");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const kafkaClient = new KafkaClient({ kafkaHost: "localhost:9092" });
// const producer = new Producer(kafkaClient);
// const consumer = new Consumer(kafkaClient, [{ topic: "chat-messages", partition: 0 }], {
//   autoCommit: true,
// });

// producer.on("ready", () => {
//   console.log("Kafka Producer is connected and ready.");
// });

// producer.on("error", (error) => {
//   console.error("Producer error:", error);
// });

// consumer.on("message", (message) => {
//   console.log("Received message from Kafka:", message.value);
// });

// consumer.on("error", (error) => {
//   console.error("Consumer error:", error);
// });

// app.post("/send-message", (req, res) => {
//   const { message } = req.body;
//   console.log("Received message from client:", message); // Log incoming message

//   const payloads = [{ topic: "chat-messages", messages: JSON.stringify(message) }];
//   producer.send(payloads, (error, data) => {
//     if (error) {
//       console.error("Error sending message to Kafka:", error);
//       return res.status(500).send("Error sending message to Kafka");
//     } else {
//       console.log("Message sent to Kafka:", data); // Log successful send to Kafka
//       return res.status(200).send("Message sent to Kafka");
//     }
//   });
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });






// const express = require("express");
// const cors = require("cors");
// const { KafkaClient, Producer, Consumer } = require("kafka-node");
// const client = require("prom-client");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Prometheus metrics
// const httpRequestDuration = new client.Histogram({
//   name: 'http_request_duration_seconds',
//   help: 'Duration of HTTP requests in seconds',
//   labelNames: ['method', 'path', 'status_code']
// });

// const kafkaMessagesConsumed = new client.Counter({
//   name: 'kafka_messages_consumed_total',
//   help: 'Total number of messages consumed from Kafka',
// });

// const kafkaMessagesProduced = new client.Counter({
//   name: 'kafka_messages_produced_total',
//   help: 'Total number of messages produced to Kafka',
// });

// client.collectDefaultMetrics();

// // Kafka setup
// const kafkaClient = new KafkaClient({ kafkaHost: "localhost:9092" });
// const producer = new Producer(kafkaClient);
// const consumer = new Consumer(kafkaClient, [{ topic: "chat-messages", partition: 0 }], {
//   autoCommit: true,
// });

// producer.on("ready", () => {
//   console.log("Kafka Producer is connected and ready.");
// });

// producer.on("error", (error) => {
//   console.error("Producer error:", error);
// });

// consumer.on("message", (message) => {
//   console.log("Received message from Kafka:", message.value);
//   kafkaMessagesConsumed.inc(); // Increment the consumed messages count
// });

// consumer.on("error", (error) => {
//   console.error("Consumer error:", error);
// });

// // Track the duration of HTTP requests
// app.use((req, res, next) => {
//   const end = httpRequestDuration.startTimer();
//   res.on("finish", () => {
//     end({ method: req.method, path: req.path, status_code: res.statusCode });
//   });
//   next();
// });

// app.post("/send-message", (req, res) => {
//   const { message } = req.body;
//   console.log("Received message from client:", message);

//   const payloads = [{ topic: "chat-messages", messages: JSON.stringify(message) }];
//   producer.send(payloads, (error, data) => {
//     if (error) {
//       console.error("Error sending message to Kafka:", error);
//       return res.status(500).send("Error sending message to Kafka");
//     } else {
//       console.log("Message sent to Kafka:", data);
//       kafkaMessagesProduced.inc(); // Increment the produced messages count
//       return res.status(200).send("Message sent to Kafka");
//     }
//   });
// });

// // Prometheus metrics endpoint
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   res.end(await client.register.metrics());
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });




const express = require("express");
const cors = require("cors");
const { KafkaClient, Producer, Consumer } = require("kafka-node");
const client = require("prom-client");
const CircuitBreaker = require("opossum"); // Import Opossum for circuit breaker

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Prometheus metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status_code']
});

const kafkaMessagesConsumed = new client.Counter({
  name: 'kafka_messages_consumed_total',
  help: 'Total number of messages consumed from Kafka',
});

const kafkaMessagesProduced = new client.Counter({
  name: 'kafka_messages_produced_total',
  help: 'Total number of messages produced to Kafka',
});

client.collectDefaultMetrics();

// Kafka setup
const kafkaClient = new KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(kafkaClient);
const consumer = new Consumer(kafkaClient, [{ topic: "chat-messages", partition: 0 }], {
  autoCommit: true,
});

producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready.");
  console.log("Circuit Breaker Activated");
});

producer.on("error", (error) => {
  console.error("Producer error:", error);
});

consumer.on("message", (message) => {
  console.log("Received message from Kafka:", message.value);
  kafkaMessagesConsumed.inc(); // Increment the consumed messages count
});

consumer.on("error", (error) => {
  console.error("Consumer error:", error);
});

// Circuit breaker options
const circuitBreakerOptions = {
  timeout: 5000, // Timeout for the operation in milliseconds
  errorThresholdPercentage: 50, // % of failed requests before circuit opens
  resetTimeout: 10000, // Time in ms before attempting to re-close the circuit
};

// Wrap producer.send with a circuit breaker
async function sendMessageToKafka(payloads) {
  return new Promise((resolve, reject) => {
    producer.send(payloads, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// Initialize the circuit breaker
const circuitBreaker = new CircuitBreaker(sendMessageToKafka, circuitBreakerOptions);

circuitBreaker.on("open", () => console.warn("Circuit breaker opened"));
circuitBreaker.on("halfOpen", () => console.info("Circuit breaker half-open"));
circuitBreaker.on("close", () => console.info("Circuit breaker closed"));

// Track the duration of HTTP requests
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({ method: req.method, path: req.path, status_code: res.statusCode });
  });
  next();
});

// POST route using the circuit breaker
app.post("/send-message", async (req, res) => {
  const { message } = req.body;
  console.log("Received message from client:", message);

  const payloads = [{ topic: "chat-messages", messages: JSON.stringify(message) }];
  
  try {
    const data = await circuitBreaker.fire(payloads);
    kafkaMessagesProduced.inc(); // Increment produced messages count
    res.status(200).send("Message sent to Kafka");
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(503).send("Service unavailable, please try again later");
  }
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
app.get("/hello", async (req, res) => {
  res.send("hello");
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
