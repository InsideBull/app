export class CarType{
	
	type : string;
	nbplace ?: number;
	placelist ?: string;
	notavailable ?: string;
	nbRows ?: number;
	nbCols ?: number;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}