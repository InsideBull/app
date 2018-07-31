export class Voyage {
	arrivalstation: string;
	cooperative?: string;
	date: string;
	time?: string;
	price: string;
	reservation?: any;
	startstation: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}