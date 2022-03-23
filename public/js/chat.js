let user = null
let socket = null
const url = 'http://localhost:8080/api/auth/'

const Uid = document.querySelector('#Uid')
const msg = document.querySelector('#msg')
const ulUsers = document.querySelector('#ulUsers')
const ulMessages = document.querySelector('#ulMessages')
const btnLogout = document.querySelector('#btnLogout')


const validateToken = async () => {
    const token = localStorage.getItem('token') || ''

    if (token.length <= 10) {
        window.location = 'index.html'
        throw new Error('No token')
    }

    const response = await fetch(url, {
        headers: {
            'x-auth-token': token
        }
    })

    const { user: userDB, token: tokenDB } = await response.json()
    localStorage.setItem('token', tokenDB)

    user = userDB
    document.title = user.name

    await connectSocket()

}

const main = async () => {

    await validateToken()
}

const connectSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-auth-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('connected')
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('receiveMessages', () => {
        console.log('receiveMessages')
    })

    socket.on('usersOnline', () => {
        console.log('usersOnline')
    })

    socket.on('privateMessage', () => {
        console.log('privateMessage')
    })
}


main()