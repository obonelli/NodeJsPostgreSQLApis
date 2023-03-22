<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207" width="200" alt="React Logo" /></a>
</p>

# Run in development

1. Clone the repository
2. Execute
```
npm install
```
3. The application has JWT validation so it is necessary to register so that when logging in you can obtain a new JWT and thus use the other endpoints

# ✨Enabled endPoints
```
http://localhost:3000/auth/login POST: Allows users to log in to the application.
```
```
http://localhost:3000/auth/register POST: Allows users to register for the application.
```
```
http://localhost:3000/api/messages/:id GET: Retrieves a specific message by its ID.
```
```
http://localhost:3000/api/messages POST: Creates a new message.
```
```
http://localhost:3000/api/messages/:id PUT: Updates an existing message using its ID.
```
```
http://localhost:3000/api/messages/:id DELETE: Deletes an existing message using its ID.
```
## Stack
* PostgreSQL
* NodeJS Express
* Typescript