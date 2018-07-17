export class Trip  {
	
	car: string;
	voyage: string;
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}