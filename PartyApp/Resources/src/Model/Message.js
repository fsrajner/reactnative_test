var Parse = require('parse/react-native');

class Message extends Parse.Object {
    constructor() {
        super('Message');
        this.from = null;
        this.conversation = null;
        this.text = "";
        this.create_date = new Date();
        this.send_date = new Date();
        this.receive_date = new Date();
        this.read_date = new Date();
        this.sent = false;
        this.received = false;

    }

    static create(from, conversation, text) {
        var message = new Message();
        message.set('from', from);
        message.set('conversation', conversation);
        message.set('text', text);
        message.set('create_date', new Date());
        return message;
    }
}
export default Message;