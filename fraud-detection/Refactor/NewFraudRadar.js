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
	const result = [];
	for (let i = 0; i < orders.length; i++) {
		const current = orders[i];

		for (let j = i + 1; j < orders.length; j++) {
			if (CHECKS.checkForFraud(current, orders[j])) {
				result.push({
					isFraudulent: true,
					orderId: orders[j].orderId
				})
			}
		}
	}
	return result;
}

module.exports = { Check }
