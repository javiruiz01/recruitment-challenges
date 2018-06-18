class Order {
	constructor(line) {
		let items = line.split(',');

		this.orderId = items[0];
		this.dealId = items[1];
		this.email = items[2];
		this.street = items[3];
		this.city = items[4];
		this.state = items[4];
		this.zipCode = items[6];
		this.creditCard = items[7];
	}
	
	setEmail(email) {
		this.email = email;
		return this;
	}

	setStreet(street) {
		this.street = street;
		return this;
	}

	setState(state) {
		this.state = state;
		return this;
	}
}

module.exports = { Order };