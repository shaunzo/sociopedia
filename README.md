# sociopedia


## To start server / backend
1. Create your project on mongo Atlas, create a database and retieve your <DB URL>
2. Create a .env file in the /server directory and add the following
```
MONGO_URL = <DB URL>
JWT_SECRET='someSuperHardStringToGuess'
PORT = 3001
```
3. Ensure that NodeJS is installed and run `npm install`
4. `cd ./server` and run `npm start`