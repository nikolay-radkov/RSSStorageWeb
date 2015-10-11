class Entry {
	constructor(title, createdAt, content, subscriptionId) {	
		if(!title && !createdAt && !content && !subscriptionId) {
			throw "Unspecified field";
		}

		this.title = title;
		this.createdAt = createdAt;
		this.content = content;
		this.subscriptionId = subscriptionId;
	}
}

module.exports = Entry;