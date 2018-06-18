class Checks {
    constructor() {
        this.list = [
            checkBase,
            checkEmail,
            checkDirection
        ];
    }

    isFraud(current, order) {
        return this.list.some(check => { return check(current, order); });
    }
}

function checkBase(current, order) {
    return current.dealId === order.dealId && current.creditCard !== order.creditCard;
}

function checkEmail(current, order) {
    return current.email === order.email;
}

function checkDirection(current, order) {
    return current.state === order.state && current.zipCode === order.zipCode && current.street === order.street && current.city === order.city;
}

module.exports = { Checks };