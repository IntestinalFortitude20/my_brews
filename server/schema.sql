CREATE DATABASE My_Breweries;
USE My_Breweries;

-- Create the Breweries table
CREATE TABLE breweries (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brewery_type VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    longitude VARCHAR(50),
    latitude VARCHAR(50),
    phone VARCHAR(20),
    website VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the BeersOnTap table
CREATE TABLE BeersOnTap (
    BeerID INT AUTO_INCREMENT PRIMARY KEY, -- Auto-increment for IDs not provided by the API
    BeerName VARCHAR(255) NOT NULL,
    BeerType VARCHAR(100) NOT NULL,
    ABV DECIMAL(3, 1) NOT NULL
);

-- Create the BreweryBeers junction table
CREATE TABLE Brewery_Beers_Junction (
    BreweryID VARCHAR(255),
    BeerID INT,
    PRIMARY KEY (BreweryID, BeerID),
    FOREIGN KEY (BreweryID) REFERENCES Breweries(BreweryID),
    FOREIGN KEY (BeerID) REFERENCES BeersOnTap(BeerID)
);