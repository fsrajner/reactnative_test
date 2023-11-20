var Parse = require('parse/react-native');

class User extends Parse.Object {
    constructor() {
        super('User');
        this.user = null;
        this.karma = 0;
        this.status = "DEFAULT";
        this.banned = "false";
        this.deleted = "false";
    }

    static create(parse_user) {
        var user = new User();
        user.set('user', parse_user);
        return user;
    }
}
export default User;

// visibility:
// 0: banned,
// 1: private,
// 2: interested gender only,
// 3: anyone