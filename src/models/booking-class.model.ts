export class BookingClass  {
	
	type: string;
	description: string;
	price: number;
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}