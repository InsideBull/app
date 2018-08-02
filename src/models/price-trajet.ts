export class PriceTrajet{
    classe: string;
    price?: number;

    constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}