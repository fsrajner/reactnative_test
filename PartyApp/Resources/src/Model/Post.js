var Parse = require('parse/react-native');

class Post extends Parse.Object {
    constructor() {
        super('Post');
        this.author = null;
        this.text = "";
        this.tags = [];
        this.create_date = new Date();
        this.update_date = new Date();
        this.up = 0;
        this.down = 0;
        this.attachments = [];
        this.thumbnail = null;
        this.comments = [];
        this.hidden = false;
        this.parent = null;
    }

    static create(author, text, thumbnail, parent) {
        var post = new Post();
        post.set('author', author);
        post.set('thumbnail', thumbnail);
        post.set('text', text);
        post.set('parent', parent);
        return post;
    }
}
export default Post;