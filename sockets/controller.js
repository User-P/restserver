const { validateToken } = require("../helpers");

const socketController = async (socket) => {

    const user = await validateToken(socket.handshake.headers['x-auth-token'])

    if (!user)
        return socket.disconnect()

    console.log(`${user.name} connected`)

}

module.exports = { socketController };