DROP DATABASE IF EXISTS btb;
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
  subsidy TINYINT NOT NULL,
  halvings SMALLINT NOT NULL,
  numtransactions TINYINT NOT NULL,
  miningPool JSON NOT NULL,
  wallets JSON NOT NULL,
  blockwin SMALLINT NOT NULL,
  utxoPool JSON NOT NULL,
  PRIMARY KEY ( sim_id ),
  FOREIGN KEY (email) REFERENCES user (email)
 );