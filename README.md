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
4. In terminal from project root `cd ./server` and run `npm start`

## To start client / React 
1. In terminal from project root `cd ./client`
2. Install dependencies `npm install`
3. Run React app `npm run start`