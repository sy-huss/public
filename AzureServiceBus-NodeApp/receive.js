const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString =
  "Endpoint=sb://eaxexp01.servicebus.windows.net/;SharedAccessKeyName=Listen;SharedAccessKey=pDZoaBSRvce0VjAy7QbD24ko5D+UnZ4vtIuwMIHBTh0=;EntityPath=nodejs";
const queueName = "nodejs";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(
    connectionString
  );
  const queueClient = sbClient.createQueueClient(queueName);
  const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);
  try {
    const messages = await receiver.receiveMessages(1);
    console.log("Received messages:");
    console.log(messages.map((message) => message.body));
    console.log(messages.map((message) => message.label));
    console.log(messages.map((message) => message.contentType));
    console.log(messages.map((message) => message.correlationId));
    console.log(messages.map((message) => message.messageId));
    console.log(messages.map((message) => message.userProperties));
    console.log(messages.map((message) => message.viaPartitionKey));

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
