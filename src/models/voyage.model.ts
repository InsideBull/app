export class Voyage {
	arrivalstation: string;
	cooperative?: string;
	date: string;
	price: string;
	reservation?: any;
	startstation: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}