export class Station {
	city: string;
	location: string;
	name: string;
	longitude: number;
	latitude:number;


	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}