const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString =
  "Endpoint=sb://eaxexp01.servicebus.windows.net/;SharedAccessKeyName=Listen;SharedAccessKey=zr5SKMFwJn3FfTLreF207bO0qAINGQSfI0lPlUAkmxY=;EntityPath=nodejs";
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

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
