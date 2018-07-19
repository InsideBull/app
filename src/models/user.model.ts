export class User{
    id: any;
    name: string;
    email?: string;
    picture?: any;
    birthday?: any;
    city?: string;

    constructor(object?: {}) {
		for (var key in object) {
			this[key] = object[key];
		}
	}
}