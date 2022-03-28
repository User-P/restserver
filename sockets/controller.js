const { validateToken } = require("../helpers");
const { Chat } = require('../models');

const chatMessages = new Chat();

const socketController = async (socket, io) => {

    const user = await validateToken(socket.handshake.headers['x-auth-token'])

    if (!user) return socket.disconnect()

    chatMessages.addUser(user);
    io.emit('usersOnline', chatMessages.usersArray)

    socket.on('disconnect', () => {
        chatMessages.removeUser(user.uid);
        io.emit('usersOnline', chatMessages.usersArray)
    }
    )

}

module.exports = { socketController };