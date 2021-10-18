<!-- @format -->

# BlockchainSim

## Quick Start

```bash
# Install dependencies for server
npm/yarn install

# Install dependencies for client (Re run this for new packages)
npm/yarn run client-install

# Run the client & server with concurrently
npm/yarn run dev

# Run the Express server only
npm/yarn run server

# Run the React client only
npm/yarn run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

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
5. Once you are in the MySQL terminal, enter the paste in the following script.

```
CREATE Database btb;
USE btb;
CREATE TABLE user (
  email VARCHAR(256) NOT NULL,
  password VARCHAR(256) NOT NULL,
  role VARCHAR(64) NOT NULL,
  PRIMARY KEY (email)
 );
CREATE TABLE simulation (
  sim_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(256) NOT NULL,
  sim_name VARCHAR(256) NOT NULL,
  sim_shared JSON NOT NULL,
  sim_description TEXT NOT NULL,
  sim_created DATETIME NOT NULL,
  sim_modified DATETIME NOT NULL,
  sim_blocks JSON NOT NULL,
  binary_file LONGBLOB NOT NULL,
  PRIMARY KEY ( sim_id ),
  FOREIGN KEY (email) REFERENCES user (email)
 );
INSERT INTO user Values ('test@test.test', 'test1234', 'dev');
```
6. Run the command: ```SELECT * FROM user;``` to see the user inserted.

### Errors
If you run into the error when running MySQL: Client does not support authentication protocol requested by server; consider upgrading MySQL client
1. Log into MySQL on the terminal ```mysql -u root -p```
2. Run following command where password is your password for MySQL ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
3. Run the following command ```flush privileges;```

That should fix it :)

## Github CLI

### Creating Branches
To fetch branches run ```git fetch origin```

To pull a branch run ```git pull {branch name}```

To checkout a branch run ```git checkout {branch name}```

To create a new branch run ```git checkout -b {new branch name} {parent branch}```

### Merging Branches
To add work done run ```git add .``` from the root directory

To commit changes run ```git commit -m "commit message goes here"```

To push changes back to origin run ```git push origin {current branch}```


