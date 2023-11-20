var Parse = require('parse/react-native');

class Menu extends Parse.Object {
    constructor() {
        super('Menu');
        this.items = [];
    }
    
    static create(items) {
        var menu = new Menu();
        menu.set('items', items);
        return menu;
    }
}
export default Menu;