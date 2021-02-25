const ListingService = require('./listing');

describe('listingService', () => {
  describe('addListing', () => {
    const listingDao = {
      addListing: (_) => 101,
    };
    const listingService = new ListingService({ listingDao });
    const reqBody = {
      title: 'Serious appartment',
      price: '320',
      num_bedroom: '3',
      num_bathroom: '2',
      is_laundry_available: true,
      is_pet_allowed: true,
      is_parking_available: false,
      images: ['this_is_the_image_url.com'],
      description:
        'An appartment closed to the university and the bus stop. Contact me!',
    };
    it('succeeds', () => {
      const newListingId = listingService.addListing(reqBody);
      expect(newListingId).toEqual(101);
    });
  });

  describe('getAllListings test with no listing', () => {
    // GIVEN
    const listingDao = {
      getAllListings: () => [],
    };
    const listingService = new ListingService({ listingDao });

    it('succeeds', () => {
      // WHEN
      const listings = listingService.getAllListings();

      // THEN (when there are no listings in the database)
      expect(listings.length).toEqual(0);
    });
  });

  describe('getAllListings test with one listing', () => {
    // GIVEN
    const listingDao = {
      getAllListings: () => [
        {
          id: 3,
          title: 'Serious appartment',
          price: '320',
          num_bedroom: '3',
          num_bathroom: '2',
          is_laundry_available: true,
          is_pet_allowed: true,
          is_parking_available: false,
          images: ['this_is_the_image_url.com'],
          description:
            'An appartment closed to the university and the bus stop. Contact me!',
        },
      ],
    };
    const listingService = new ListingService({ listingDao });

    it('succeeds', () => {
      // WHEN
      const listings = listingService.getAllListings();

      // THEN (when there are some listings in the database)
      expect(listings.length).toEqual(1);

      // testing title name
      expect(listings[0].title).toEqual('Expensive one');
    });
  });

  describe('getListing test', () => {
    // GIVEN
    const listingDao = {
      getListing: (_) => [
        {
          id: 3,
          title: 'Serious appartment',
          price: '320',
          num_bedroom: '3',
          num_bathroom: '2',
          is_laundry_available: true,
          is_pet_allowed: true,
          is_parking_available: false,
          images: ['this_is_the_image_url.com'],
          description:
            'An appartment closed to the university and the bus stop. Contact me!',
        },
      ],
    };
    const listingService = new ListingService({ listingDao });

    it('succeeds', () => {
      // WHEN
      const listings = listingService.getListing();

      // THEN (when the listing is in the database)
      expect(listings[0].id).toEqual(3);
    });
  });
});
