export class Car {
	
	matricule : string;
	type : string;
	nbplace : number;
	occuped ?: string;
	status ?: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}