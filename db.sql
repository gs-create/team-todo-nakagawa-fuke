mysql -uroot

create database ToDoList;

use ToDoList;

create table todos (id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title varchar(255), text varchar(255));

INSERT INTO todos (title,text) VALUE ("サンプル","ここに項目の説明を入力します");
alter table todos add created_at timestamp default current_timestamp;
alter table todos add updated_at timestamp default current_timestamp on update current_timestamp;

exit