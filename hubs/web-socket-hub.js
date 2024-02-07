const WebSocket = require('ws');

class WebSocketHub {

    constructor(server) {
        this.wss = new WebSocket.Server({ server: server });

        // Maintain a mapping of connected clients
        this.clients = new Map();

        this.wss.on('connection', (ws, req) => {
            const userId = req.headers['user-id'];
            console.log('Client connected');

            this.clients.set(userId, ws);

            // Handle messages from clients
            ws.on('message', (message) => {
                console.log('Received message:', message);
            });

            // Send a welcome message immediately upon connection
            ws.send('Welcome to the WebSocket server!');
        });
    }

    broadcastMessageToAll(message){
        console.log('here', message);
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    // broadcastMessageToCertainUser(message, userId){
    //     this.wss.clients.forEach((client) => {
    //         if (client.readyState === WebSocket.OPEN && this.clients.get(userId) == ) {
    //             client.send(message);
    //         }
    //     });
    // }

    static getInstance(server) {
        // Create the instance if it doesn't exist
        if (!this.instance) {
          this.instance = new WebSocketHub(server);
        }
    
        // Return the existing instance
        return this.instance;
      }
}

function getWebSocketHub(server){
    return WebSocketHub.getInstance(server);
}

module.exports = getWebSocketHub;