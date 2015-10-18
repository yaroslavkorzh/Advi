#!/usr/bin/sh

mysql -u root -p123456aA <<MYSQL_INPUT
CREATE DATABASE IF NOT EXISTS test; use test;
create table if not exists users (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30)
NOT NULL, email VARCHAR(30) NOT NULL, password VARCHAR(30) NOT NULL);
create table if not exists campaigns (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, campaign VARCHAR(30)
NOT NULL);
create table if not exists tags (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(30)
NOT NULL);
create table if not exists video (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30)
NOT NULL);
MYSQL_INPUT