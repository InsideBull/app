export class Administrator  {
	
	email?: string;
	name: string;
	
	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}