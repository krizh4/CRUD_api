this is a api for simple create read update and delete purpose

in here you can create users and view them(deleting and updating isn't added for users)
and you can create posts. for posts you can do simple CRUD operations.

postgreSQL used for the database. before test create necessary database tables by running below commands

The users table
```
CREATE TABLE users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(8)
);
```

The posts table
```
CREATE TABLE posts (
  post_id SERIAL NOT NULL PRIMARY KEY,
  topic VARCHAR(255),
  description VARCHAR(1000),
  author INT
);
```
