### Back-End Server App

| HTTP | URI Path                  | Description                                                                             |
| ---- | ------------------------- | --------------------------------------------------------------------------------------- |
| GET  | /api/v1/                  | Homepage of the API with a welcoming message.                                           |
| GET  | /api/v1/ping              | Do a ping-pong examination to ensure database service is running.                       |
| POST | /api/v1/user/registration | Register user with email & password.                                                    |
| POST | /api/v1/user/login        | Sign user in with their email & password.                                               |
| GET  | /api/v1/user/:id          | Given the user id, return that user JSON object.                                        |
| POST | /api/v1/listing           | Add a new apartment listing with title, description, bedroom amonnts & bathroom amounts |
