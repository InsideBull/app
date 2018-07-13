export class Station {
	city: string;
	location: string;
	name: string;


	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}