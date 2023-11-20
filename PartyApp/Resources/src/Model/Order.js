var Parse = require('parse/react-native');

class Order extends Parse.Object {
    constructor() {
        super('Order');
        this.room = null,
        this.user_placed_order = null;
        this.user_accepted_order = null;
        this.user_paid = null;
        this.items = [];
        this.status = "ORDERED";
        this.price = 0;
        this.tip = 0;
        this.hidden = false;
        this.comment = "";
    }

    generateQR() {
        return 'qrcodeshit';
    }

    static create(atRoom, items, price, tip, comment, user_placed_order) {
        var order = new Order();
        order.set('room', atRoom);
        order.set('items', items);
        order.set('price', price);
        order.set('tip', tip);
        order.set('comment', comment);
        order.set('user_placed_order', user_placed_order);
        return order;
    }
}
export default Order;