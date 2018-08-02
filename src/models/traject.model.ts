export class Traject  {
	
	origin: string;
	destination: string; 
	price?: {};
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}