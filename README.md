<!-- @format -->

# BlockchainSim

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

## Deployment Steps

1. Clone in repo and get the correct branch, helpful commands may include: ```git clone``` , ```git fetch --all``` , ```git branch -v -a``` , ```git checkout -b {branch} origin/{branch}```
