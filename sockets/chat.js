module.exports = (io, socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('chatMessage', ({ room, msg, user }) => {
        console.log(`Chat message from ${user} in room ${room}: ${msg}`);
        io.to(room).emit('chatMessage', { user, msg, time: new Date() });
    });

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    });
}