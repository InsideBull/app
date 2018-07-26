export class Car {
	
	matricule : string;
	cartype : string;
	nbplace : number;
	occuped ?: string;
	status ?: string;
	image ?: string;
	workers ?: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}
