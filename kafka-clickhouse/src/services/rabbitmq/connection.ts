import {Connection} from 'rabbitmq-client'


const rabbitmqConnection = new Connection(process.env.RABBITMQ_URI);

rabbitmqConnection.on('error', (error) => {
  console.error('RabbitMQ connection error:', error);
});

rabbitmqConnection.on('connection', () => {
  console.log('Connection successfully (re)established')
})

export default rabbitmqConnection;
