### Back-End Server App

#### GENERAL

| HTTP | URI Path     | Description                                                       |
| ---- | ------------ | ----------------------------------------------------------------- |
| GET  | /api/v1      | Homepage of the API with a welcoming message.                     |
| GET  | /api/v1/ping | Do a ping-pong examination to ensure database service is running. |

#### USER

| HTTP   | URI Path                     | Description                                                                                      |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| GET    | /api/v1/user/:id             | Given the user id, return that user JSON object.                                                 |
| GET    | /api/v1/user/:id/listing     | Given the user id, return all listings belonging to this user.                                   |
| GET    | /api/v1/user/:id/listing/:id | Given the user id & the listing id, return the matching listing.                                 |
| POST   | /api/v1/user/registration    | Register user with email & password.                                                             |
| POST   | /api/v1/user/login           | Sign user in with their email & password. A auth token will be returned when login successfully. |
| PUT    | /api/v1/user/:id/listing/:id | Given the user id & the listing id, update the listing details.                                  |
| DELETE | /api/v1/user/:id/listing/:id | Given the user id & the listing id, delete the listing.                                          |

### LISTING

| HTTP | URI Path                                   | Description                                                                                     |
| ---- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| GET  | /api/v1/listing                            | Return all existing listing JSON objects to the request sender.                                 |
| GET  | /api/v1/listing/:id                        | Given the listing id, return that listing JSON object.                                          |
| GET  | /api/v1/listing/:id/comment                | Given the listing id, return all comments belonging to this listing.                            |
| POST | /api/v1/listing                            | Add a new apartment listing with title, description, bedroom amounts & bathroom amounts         |
| POST | /api/v1/listing/:id/chain                  | Given the listing id, create a new Q&A chain together with the first initial comment inside it. |
| POST | /api/v1/listing/:id/chain/:chainid/comment | Given the listing id and chain id, create a new Q&A comment inside the associated chain.        |
