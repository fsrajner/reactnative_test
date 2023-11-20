var Parse = require('parse/react-native');

class Group extends Parse.Object {
    constructor() {
        super('Group');
        this.style = {
            "background": "#ffd700"
        },
        this.posts = [];
        this.subscribed_users = [];
        this.banned_users = [];
        this.priority = 0;
        this.admin = null;
        this.title = "";
    }

    static create(admin, title) {
        var group = new Group();
        group.set('admin', admin);
        group.set('title', title);
        return group;
    }
}
export default Group;