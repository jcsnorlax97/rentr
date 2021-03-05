# Core Features

## [User account management](https://github.com/jcsnorlax97/rentr/issues/128)
#### As a user (landlord or tenant), I want to be able to create my account.
Priority: High, Estimates: 4 days
Acceptance test: 
- Landlords can post a listing.
- Tenants can see landlords’ listings.

#### As a user (landlord or tenant), I want to be able to log in/out from my account.
Priority: High, Estimates: 3 days
Acceptance test:
- Users can type their login information to log in to their account.
- Users can log out.

#### As a landlord, I want to be able to see listings associated with my account.
Priority: Medium, Estimate: TBD
Acceptance test:
- Landlords can see all of their listings in one place.


## [Adding apartment listings](https://github.com/jcsnorlax97/rentr/issues/129)

#### As a landlord, I need to be able to add my apartment to be rented out.
Priority: High, Estimates: 3 days
Acceptance test: 
- Landlords can create an apartment listing.
- Users can click on a button to add a listing, and then a listing creation dialog appears
 - Listing creation dialog/form includes fields for title, price, number of bedrooms, number of bathrooms, and description.
  - Users can click a submit button on the listing creation dialog to submit their entry

#### As a landlord, I need myself and other to be able to see a listing
Priority: High, Estimates: 5 days
Acceptance test: 
- Both landlords and tenants should be able to see created apartment listings.
- Pagination works when there is more than 1 page of listing

#### As a landlord, I need to be able to add pictures of my apartment.
Priority: High, Estimates: 5 days
Acceptance test: 
- Landlords can upload pictures and add them to the listing.
- Listings show uploaded pictures.



## [Modifying the rental properties](https://github.com/jcsnorlax97/rentr/issues/117)

#### Modifying the rental properties
  - Priority: High, Estimates: TBD 
  - Acceptance test:
    - For any of a landlord’s listings, the landlord can modify the following fields:
      - I can edit the price of any of my rental property listings.
      - I can edit the “number of bedrooms” of any of my rental property listings.
      - I can edit the “number of bathrooms” of any of my rental property listings.
      - I can edit the description of any of my rental property listings.
    - The listing shows the new (edited) details when viewed.
 
#### As a landlord, I want to be able to specify whether my listing has been rented out yet.
  - Priority: Medium, Estimates: TBD
  - Acceptance test:
    - Landlords can mark any of their rental property listings as available or not.
    - The listing will only appear when it’s marked as available.

#### As a landlord, I want to be able to delete my rental property listing.
  - Priority: Medium/Low, Estimates: TBD
  - Acceptance test:
    - Landlords can delete any of their rental property listings.
    - The listing should not be displayed after the deletion.

### [Searching for rental properties](https://github.com/jcsnorlax97/rentr/issues/130)

#### As a tenant, I want to be able to search for properties based on price range, i.e. minimum price and maximum price.
Priority: Medium, Estimates: TBD
Acceptance test:
- Tenants can browse listings that are within their specified budget range.

#### As a tenant, I want to be able to search for properties based on cities.
Priority: Medium, Estimates: TBD
Acceptance test:
- Tenants can find listings that only correspond to their specific area(s).

#### As a tenant, I want to be able to search for properties based on the number of bedrooms it has.
Priority: Medium, Estimates: TBD
Acceptance test:
- Tenants can find listings that have the number of bedrooms specified.

#### As a tenant, I want to be able to search for properties based on keyword(s).
Priority: Medium, Estimates: TBD
Acceptance test:
- Tenants only find listings that contain the keyword(s).


### [Q&A Section](https://github.com/jcsnorlax97/rentr/issues/131)

#### As a tenant, I can publicly post an FAQ question about a particular listing so that I can save time for other renters.
Priority: Medium, Estimates: TBD
Acceptance test:
- For each listing, tenants can ask questions.
- For each listing, tenants can see questions from other tenants.

#### As a user, I can publicly answer an FAQ about a particular listing.
Priority: Medium, Estimate: TBD
Acceptance test:
- Users can post answers to questions.
- Users can see answers from other users.
