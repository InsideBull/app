export class BookingClassType  {
	
	name: string;
    description: string
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}