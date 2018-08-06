export class PriceTrajet{
    classe: any;
	price?: any;
	key?: any;

    constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}