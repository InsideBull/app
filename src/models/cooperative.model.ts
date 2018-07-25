export class Cooperative {
	
	name: string;
	logo ?: string;
	admins ?: string;
	status: boolean;
	desc ?: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

}