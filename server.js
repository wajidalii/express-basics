// const cluster = require('cluster');
// const os = require('os');

// if (cluster.isMaster) {
//     const cpuCount = os.cpus().length;
//     console.log(`Master process is running. Forking ${cpuCount} workers...`);

//     for (let i = 0; i < cpuCount; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.warn(`Worker ${worker.process.pid} died. Spawning a new one.`);
//         cluster.fork();
//     });
// } else {
//     // Each worker loads the same Express app
//     const app = require('./index');
//     const config = require('./config');
//     app.listen(config.port, () =>
//         console.log(`Worker ${process.pid} listening on port ${config.port}`)
//     );
// }

const http = require('http');
const app = require('./index');
const config = require('./config');
const sockets = require('./sockets');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: config.frontendUrl,
        methods: ['GET', 'POST'],
    }
});

module.exports = io;

sockets(io);

server.listen(config.port, () =>
    console.log(`Server & WebSocket listening on port ${config.port}`)
);