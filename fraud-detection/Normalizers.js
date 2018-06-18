class Normalizers {
    constructor() {
        this.list = [
            normalizeValues,
            normalizeEmail,
            normalizeStreet,
            normalizeState
        ];
    }

    normalize(order) {
         this.list.forEach(norm => {
            order = norm(order);
        });
        return order;
    }
}

function normalizeValues(order) {
    order.orderId = Number(order.orderId);
    order.dealId = Number(order.dealId);
    order.city = order.city.toLowerCase();
    return order;
}

function normalizeEmail(order) {
	return order.setEmail(order.email.replace(order.email.slice(order.email.indexOf('+') - 1, order.email.indexOf('@')), ''));
}

function normalizeStreet(order) {
	return order.setStreet(order.street.toLowerCase().replace('st.', 'street').replace('rd.', 'road'));
}

function normalizeState(order) {
	return order.setState(order.state.toLowerCase().replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york'));
}


module.exports = { Normalizers };