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
});
