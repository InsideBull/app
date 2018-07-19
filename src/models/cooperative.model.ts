export class Cooperative {
	
	name: string;
	logo ?: string;
	admins ?: string;
	status: boolean;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

}