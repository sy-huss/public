const { ServiceBusClient } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString =
  "Endpoint=sb://eaxexp01.servicebus.windows.net/;SharedAccessKeyName=Send;SharedAccessKey=aWnwfxGGski3ByAYfsewUskFIM4BLd0TvLKOzjUUHR0=;EntityPath=nodejs";
const queueName = "nodejs";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(
    connectionString
  );
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  try {
    for (let i = 0; i < 1; i++) {
      const message = {
        body:
          '{"fullname": "Syed Hussain","email": "syed.hussain@ea360.com","mainphone": "0789023451"}',
        contentType: "application/json",
        label: "Contact",

        userProperties: {
          myCustomPropertyName: "my custom property value",
        },
      };
      console.log(`Sending message: ${message.body}`);
      await sender.send(message);
    }

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
