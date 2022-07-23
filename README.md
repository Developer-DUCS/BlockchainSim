<!-- @format -->

# BlockchainSim

The Beyond the Block blockchain simulator, BlockchainSim, is a Bit Coin Simulator developed at Drury University by Bryan Valencia, Laura Pareja, Seth Workman, Sean Lowry, Ean Vandergraaf, and Dawson Holderman under the direction of Dr. Scott Sigman and Dr. Chris Branton.  The project is licensed under the Apache 2.0 license.  Copyright 2021 by Drury University.

Current release code is found in the dev branch.

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client (Re run this for new packages)
npm run client-install

# Start up the app for development
npm run dev
```

### Errors
_If you get React Hook error (mismatched React versions)_
- Close development server
- run ```yarn install```

### Extra Steps For Developers 

1. Use Visual Studio Code
2. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. Make sure code auto formats to project standards.

### Testing

```bash
# Run Tests (located in src/tests directory)
npm/yarn run test
```

### Examples

1. Api example: api/customers.js
2. Basic React Example: components/Error.js

## MySQL Database Setup

1. Download [MySQL Community Server Edition](https://dev.mysql.com/downloads/mysql/)
2. Install MySQL
3. From the command line/terminal type: ```mysql -u root -p```
4. Enter the password you created during installation
5. Once you are in the MySQL terminal type: ``` source /path/to/scripts/databaseCreation.sql```

### Errors
If you run into the error when running MySQL: Client does not support authentication protocol requested by server; consider upgrading MySQL client
1. Log into MySQL on the terminal ```mysql -u root -p```
2. Run following command where password is your password for MySQL ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
3. Run the following command ```flush privileges;```

That should fix it :)

## Deployment

1. Clone in repo and get the correct branch, helpful commands may include: ```git clone``` , ```git fetch --all``` , ```git branch -v -a``` , ```git checkout -b {branch} origin/{branch}```
2. Install dependencies: ```cd ./BlockchainSim``` , ```yarn install``` , ```cd client``` , ```yarn install```
3. Rename BlockchainSim to btb: ```mv ./BlockchainSim btb```.
4. Update database: If database has not been created follow steps on wiki to create database, else alter dbConn.js file to contain correct credentials
5. Update client/package.json: insert ```“homepage” : “mcs.drury.edu/BtB”,``` below private and above dependencies, and insert ```“start”: “PORT=3220 react-scripts start”``` instead of ```"start": "react-scripts start"```.
6. Update client .env file. ```REACT_APP_API_URL=mcs.drury.edu/BtB```.
7. Update server.js to not include /BtB/ prefix in the routes. From: ```router.use("/BtB/api/users", require("./api/users"));``` to: ```router.use("/api/users", require("./api/users"));``` .

8. Build project: ```cd client``` , ```npm run build```
9. You only need four pm2 commands. ```pm2 ls``` will list processes, ```pm2 stop 3``` will stop number 3, ```pm2 restart 2``` will restart process number 2, ```pm2 start 73``` will start process number 73.
