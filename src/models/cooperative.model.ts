export class Cooperative {
	
	private _name: string;
	private _logo: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

}