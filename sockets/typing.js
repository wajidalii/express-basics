module.exports = (io, socket) => {
    socket.on('userTyping', ({ room, user }) => {
        console.log(`User ${user} is typing in ${room}`);
        io.to(room).emit('userTyping', { user });
    });

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    });
}