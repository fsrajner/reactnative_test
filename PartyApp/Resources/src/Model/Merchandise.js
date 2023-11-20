var Parse = require('parse/react-native');

class Merchandise extends Parse.Object {
    constructor() {
        super('Merchandise');
        this.thumbnail = null;
        this.name = "";
        this.type = "";
        this.description = "";
    }
    
    static create(thumbnail, name, type, description) {
        var merchandise = new Merchandise();
        merchandise.set('thumbnail', thumbnail);
        merchandise.set('name', name);
        merchandise.set('type', type);
        merchandise.set('description', description);
        return merchandise;
    }
}
export default Merchandise;