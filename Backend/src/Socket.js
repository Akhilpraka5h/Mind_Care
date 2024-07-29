// Import required package
const { Server } = require("socket.io");
const { chatWithAiController } = require('./controllers/AiChat.controller.js');

const initializeSocket=(server)=> {

    const io = new Server(server, {
        cors: {
        origin: 'http://localhost:5000', // Replace with your React app's origin
        methods: ['GET', 'POST'],
      },
    });

  
    io.on('connection', (socket) => {


      console.log('User connected');
  
      // You can handle socket events here
      socket.on('userMessage', async(message) => {

        // Process the message or delegate to  controller
        const response = await chatWithAiController(message,socket);
       
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      // Handle errors
      socket.on('error', (error) => { 
        console.error('Socket.IO error:', error);
      }
      );
    });
  
    return io;
  }

  exports.initializeSocket;
  