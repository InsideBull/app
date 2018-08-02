export class Traject  {
	
	origin: string;
	destination: string; 
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}