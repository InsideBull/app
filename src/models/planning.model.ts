export class Planning  {
	
	cars: string;
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}