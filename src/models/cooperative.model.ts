export class Cooperative {
	
	name: string;
	logo ?: string;
	admins ?: string;
	status: boolean;
	desc ?: string;
	nameContact : string;
	telContact : string;
	addrContact: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

}