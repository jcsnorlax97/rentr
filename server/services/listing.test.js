const ListingService = require('./listing');

describe('listingService', () => {
  describe('addListing', () => {
    const listingDao = {
      addListing: () => 101,
    };
    const listingService = new ListingService({ listingDao });
    const reqBody = {
      title: 'Testing Apartment title',
      description: 'Testing Apartment description',
      numBedroom: '>10',
      numBathroom: '>10',
    };
    it('succeeds', () => {
      const newListingId = listingService.addListing(reqBody);
      expect(newListingId).toEqual(101);
    });
  });

  describe('getAllListings test with no listing', () => {
    //GIVEN
    const listingDao = {
      getAllListings: () => []
    };
    const listingService = new ListingService({ listingDao });
    
    it('succeeds', () => {
      // WHEN
      const listings = listingService.getAllListings();

      //THEN
      //when there are no listings in the database
      expect(listings.length).toEqual(0);
    });
  });

  describe('getAllListings test with one listing', () => {
    //GIVEN
    const listingDao = {
      getAllListings: () => [{ "title": "Expensive one",
      "description": "one million dollars",
      "num_bedroom": ">10",
      "num_bathroom": "5"}]
    };
    const listingService = new ListingService({ listingDao });
    
    it('succeeds', () => {
      // WHEN
      const listings = listingService.getAllListings();

      //THEN
      //when there are some listings in the database
      expect(listings.length).toEqual(1);

      //testing title name 
      expect(listings[0].title).toEqual("Expensive one");
    });
  });
});
