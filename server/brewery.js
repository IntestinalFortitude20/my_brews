class Brewery {
    // Private properties
    #id;
    #name;
    #breweryType;
    #address1;
    #address2;
    #address3;
    #city;
    #stateProvince;
    #postalCode;
    #country;
    #longitude;
    #latitude;
    #phone;
    #websiteUrl;
    #state;
    #street;

    // Public property
    beers;

    constructor() {
        this.beers = [];
    }

    initialize(data) {    
        // Initialize private properties
        this.#id = data.id;
        this.#name = data.name;
        this.#breweryType = data.breweryType;
        this.#address1 = data.address1;
        this.#address2 = data.address2;
        this.#address3 = data.address3;
        this.#city = data.city;
        this.#stateProvince = data.stateProvince;
        this.#postalCode = data.postalCode;
        this.#country = data.country;
        this.#longitude = data.longitude;
        this.#latitude = data.latitude;
        this.#phone = data.phone;
        this.#websiteUrl = data.websiteUrl;
        this.#state = data.state;
        this.#street = data.street;
    }
        
    // Public method to get private properties
    getBreweryDetails() {
        return {
            id: this.#id,
            name: this.#name,
            breweryType: this.#breweryType,
            address1: this.#address1,
            address2: this.#address2,
            address3: this.#address3,
            city: this.#city,
            stateProvince: this.#stateProvince,
            postalCode: this.#postalCode,
            country: this.#country,
            longitude: this.#longitude,
            latitude: this.#latitude,
            phone: this.#phone,
            websiteUrl: this.#websiteUrl,
            state: this.#state,
            street: this.#street
        };
    }


    
}

export default Brewery;

/*
    brewBeer(beerType) {
        console.log(`${this.name} is brewing ${beerType} at ${this.location}.`);
    }
}

// Example usage:
const myBrewery = new Brewery('Awesome Brews', 'New York');
myBrewery.brewBeer('IPA'); */