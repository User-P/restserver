let user = null
let socket = null
const url = 'http://localhost:8080/api/auth/'


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

    const socket = io({
        'extraHeaders': {
            'x-auth-token': localStorage.getItem('token')
        }
    });

}


main()