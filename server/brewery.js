class Brewery {
    constructor(id, name, brewery_type, address, city, state,
        postal_code, country, phone, website, longitude, latitude) {
        this.id = id;
        this.name = name;
        this.brewery_type = brewery_type; 
        this.address = address;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
        this.country = country;
        this.phone = phone;
        this.website = website;
        this.longitude = longitude;
        this.latitude = latitude;
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