export class BookingClass  {
	
	type: string;
	description: string;
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}