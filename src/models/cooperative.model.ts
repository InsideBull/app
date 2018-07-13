export class Cooperative {
	
	name: string;
	logo ?: string;
	admins ?: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

}