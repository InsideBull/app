export class QRCodeValidation {
	
	key: string;
	name: string;
	status ?: boolean;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
		this.status = false;
	}
}

