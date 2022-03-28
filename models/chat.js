class Message {
    constructor(uid, message, name) {
        this.uid = uid;
        this.message = message;
        this.name = name;
    }
}
class Chat {

    constructor() {
        this.messages = [];
        this.users = {};
    }

    get last10() {
        return this.messages.slice(-10);
    }

    get usersArray() {
        return Object.values(this.users);
    }

    sendMessage(uid, message, name) {
        this.messages.unshift(new Message(uid, message, name));
    }

    addUser(user) {
        this.users[user.id] = user;
    }

    removeUser(uid) {
        delete this.users[uid];
    }

}

module.exports = Chat;