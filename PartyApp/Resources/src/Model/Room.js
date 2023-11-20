var Parse = require('parse/react-native');

class Room extends Parse.Object {
    constructor() {
        super('Room');
        this.style = {
            "background": "#ffd700"
        },
        this.menu = null;
        this.thumbnail = null;
        this.posts = [];
        this.subscribed_users = [];
        this.banned_users = [];
        this.priority = 0;
        this.admin = null;
        this.title = "";
        this.cashiers = [];
        this.managers = [];
    }
    
    static create(admin, title, thumbnail) {
        var room = new Room();
        room.set('admin', admin);
        room.set('title', title);
        room.set('thumbnail', thumbnail);
        room.addUnique('subscribed_users', admin);
        return room;
    }
}
export default Room;