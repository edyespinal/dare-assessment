# DARE NodeJS Code Assessment

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Pending](#pending)

## About <a name = "about"></a>

This project was made as code assessment for NodeJS.
It consists of a RESTful API that functions as a middleware.

## Getting Started <a name = "getting_started"></a>

This project includes a some routes for testing purposes only.
This project uses enviroment variables, so after cloning this repository and installing dependencies you would have to add these three:

- PORT
- CLIENT_ID
- CLIENT_SECRET

For this project, these variables were set using [dotenv](https://www.npmjs.com/package/dotenv).
If you decide to use dotenv package as well you can run the following command in your terminal and run the application with the variables set:

```
npm run dev
```

Additionally, this project uses [nodemon](https://www.npmjs.com/package/nodemon) for development which can be installed globally:

```
npm install -g nodemon
```

## Usage <a name = "usage"></a>

After starting the application you can visit http://localhost:PORT (the port number depends on the one set in the enviroment variables).
There you can use the login button to generate a new token and visit the following routes that use this API for demonstration purposes only.

- /policies - displays a list of policies limited to 10 by default. You can use page & limit as query params to view different policies.
- /policies/:id - displays a policies' clients details
- /clients - displays a list of clients limited to 10 by default. You can use page & limit as query params to view different clients.
- /clients/:id - using any of the clients ID you can view their details.
- /clients/:id/policies - displays a list of a clients' policies.

---

## Pending updates <a name = "pending"></a>

- Add functionality to show data according to user roles (user & admin).
- Add better error hanlding.
