export class Cooperative {
	
	private _name: string;
	private _logo: string;

	constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}

	public get name() : string {
		return this._name;
	}

	public get logo() : string {
		return this._logo;
	}

	public set name(name : string) {
		this._name = name;
	}

	public set logo(logo : string) {
		this._logo = logo;
	}
}