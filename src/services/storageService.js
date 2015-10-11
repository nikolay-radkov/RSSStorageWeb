class StorageService  {
	static getAll() {
		return JSON.parse(localStorage.getItem('subscriptions'));
	}
	static add(item) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		if (!subscriptions) {
			subscriptions = [];
		}
		subscriptions.push(item);
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
	static getById(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		return subscriptions[id];
	}
	static remove(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		subscriptions.splice(id, 1);
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
	static update(id, item) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		subscriptions[id] = item;
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
}

module.exports = StorageService;