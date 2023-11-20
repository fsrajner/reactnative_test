var Parse = require('parse/react-native');

class Conversation extends Parse.Object {
    constructor() {
        super('Conversation');
        this.last_message_date = new Date();
        this.subscribed_users = null;
        this.banned_users = null;
        this.attachments = null;
        this.title = "";
        this.thumbnail = null;
    }

    static create(subscribed_users, title, thumbnail) {
        var conversation = new Conversation();
        conversation.set('subscribed_users', subscribed_users);
        conversation.set('title', title);

        //for now only 1 to 1 conversations
        if (!thumbnail && subscribed_users.length > 0) {
            var pic = subscribed_users[0].get('profile_picture');
            if (pic)
                conversation.set('thumbnail', pic._url);
        } else
            conversation.set('thumbnail', thumbnail);

        return conversation;
    }
}
export default Conversation;