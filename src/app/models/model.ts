export class Place {
    id: string;
    parentId: string;
    name: string;

    constructor(id: string, parentId: string, name: string) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
    }
}

export class District {
    id: string;
    parentId: string;
    name: string;
    places: Place[];

    constructor(id: string, parentId: string, name: string, places: Place[]) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.places = places;
    }
}

export class State {
    id: string;
    parentId: string;
    name: string;
    districts: District[];

    constructor(id: string, parentId: string, name: string, districts: District[]) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.districts = districts;
    }
}

export class Country {
    id: string;
    name: string;
    states: State[];

    constructor(id: string, name: string, states: State[]) {
        this.id = id;
        this.name = name;
        this.states = states;
    }
}
