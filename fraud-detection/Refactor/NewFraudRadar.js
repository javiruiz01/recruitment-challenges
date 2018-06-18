const fs = require('fs');
const order = require('./Order.js');
const normalizers = require('./Normalizers.js');
const checks = require('./Checks.js');

const NORMS = new normalizers.Normalizers();
const CHECKS = new checks.Checks();

function Check (filePath) {
	const lines = getLinesFromFile(filePath);
	const orders = createOrdersFromLines(lines);

  	return getFraudulentOrders(orders);
}

function getLinesFromFile(filePath) {
	let fileContent;
	try {
		fileContent = fs.readFileSync(filePath, 'utf8');
	} catch (err) {
		throw err;
	}
	return fileContent.split('\n');
}

function createOrdersFromLines(lines) {
	return lines.map(line => NORMS.normalize(new order.Order(line)));
}

function getFraudulentOrders(orders) {
	return orders.reduce((acc, order) => {
		for (let i = orders.indexOf(order) + 1; i < orders.length; i++) {
			if (CHECKS.isFraud(order, orders[i])) {
				acc = [...acc, {
					isFraudulent: true,
					orderId: orders[i].orderId
				}];
			}
		}
		return acc;
	}, []);
}

module.exports = { Check }