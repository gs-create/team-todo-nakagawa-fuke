mysql -uroot;

create database ToDoList;

use ToDoList;

create table todos (id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title varchar(255), text varchar(255));

INSERT INTO todos (title,text) VALUE ("サンプル","ここに項目の説明を入力します");

exit

