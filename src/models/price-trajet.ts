export class PriceTrajet{
    classe: string;
	price?: string;
	key?: any;

    constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}