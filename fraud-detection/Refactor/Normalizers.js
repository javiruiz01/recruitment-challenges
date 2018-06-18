class Normalizers {
    constructor() {
        this.list = [
            normalizeValues,
            normalizeEmailDot,
            normalizeEmailPlus,
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
    return order.setOrderId(Number(order.orderId)).setDealId(Number(order.dealId)).setCity(order.city.toLowerCase());
}

function normalizeEmailPlus(order) {
	return order.setEmail(order.email.replace(order.email.slice(order.email.indexOf('+') - 1, order.email.indexOf('@')), ''));
}

function normalizeEmailDot(order) {
	return order.setEmail(order.email.replace('.', ''));
}

function normalizeStreet(order) {
	return order.setStreet(order.street.toLowerCase().replace('st.', 'street').replace('rd.', 'road'));
}

function normalizeState(order) {
	return order.setState(order.state.toLowerCase().replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york'));
}


module.exports = { Normalizers };