const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'

        }

        this.connectDB();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    async connectDB() {
        await dbConnection()
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    sockets() {
        this.io.on('connection', socket => socketController(socket, this.io));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;