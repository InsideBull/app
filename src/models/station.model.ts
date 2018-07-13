export class Station {
	city: string;
	location: string;
	name: string;
	key?: string;


	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}