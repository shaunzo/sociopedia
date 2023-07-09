# sociopedia


## To start server / backend

NB. If running this app for the first time, you may need to seed the mongo DB with data. To do so, before spinning up the server, uncomment lines 69-71 in server/index.js. Be sure to comment it out again to prevent the db from being overloaded with data. This is intended to only run once, for demo purposes.

1. Create your project on mongo Atlas, create a database and retieve your cluster url which should look something like: `mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.xkbuj9m.mongodb.net/?retryWrites=true&w=majority`
2. Create a .env file in the /server directory and add the following
```
MONGO_URL = <DB URL>
JWT_SECRET='someSuperHardStringToGuess'
PORT = 3001
```
3. Ensure that NodeJS is installed and run `cd ./server && npm install`
4. In terminal from project root `cd ./server` and run `npm start`

## To start client / React 
1. In terminal from project root `cd ./client`
2. Create a .env file and add the BASE_URL variable: `REACT_APP_BASE_URL=http://localhost:3001`
2. Install dependencies `npm install`
3. Run React app `npm start`
