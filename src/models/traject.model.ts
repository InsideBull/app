export class Traject  {
	
	depart: any;
	arrive: any; 
	price?: {};
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}