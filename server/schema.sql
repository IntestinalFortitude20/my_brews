CREATE DATABASE My_Breweries;
USE My_Breweries;

-- Create the Breweries table
CREATE TABLE Breweries (
    BreweryID VARCHAR(255) PRIMARY KEY, -- Use the ID from the API response
    BreweryName VARCHAR(255) NOT NULL,
    BreweryType VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State_Province VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(20) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Longitude DECIMAL(10, 7) NOT NULL, -- Use DECIMAL for precise coordinates
    Latitude DECIMAL(10, 7) NOT NULL,
    Phone VARCHAR(20),
    Website_url VARCHAR(255),
    
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