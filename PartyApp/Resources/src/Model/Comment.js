var Parse = require('parse/react-native');

class Comment extends Parse.Object {
    constructor() {
        super('Comment');
        this.author = null;
        this.text = "";
        this.create_date = new Date();
        this.update_date = new Date();
        this.up = 0;
        this.down = 0;
        this.attachments = [];
        this.comments = [];
    }
    
    static create(author, text) {
        var comment = new Comment();
        comment.set('author', author);
        comment.set('text', text);
        return comment;
    }
}
export default Comment;