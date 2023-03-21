CREATE TABLE users 
		(
			id serial PRIMARY KEY,
			name VARCHAR ( 255 ) NOT NULL,
			email VARCHAR ( 255 ) UNIQUE NOT NULL,
			password VARCHAR ( 255 ) NOT NULL
		);
CREATE TABLE workspaces 
		(
			workspace_id serial PRIMARY KEY,
			owner_id INT NOT NULL,
			FOREIGN KEY (owner_id)
				REFERENCES users (id)
		);
CREATE TABLE boards 
		(
			board_id serial PRIMARY KEY,
			board_name VARCHAR ( 255 ) NOT NULL,
			workspace_id INT NOT NULL,
			FOREIGN KEY (workspace_id) 
				REFERENCES workspaces (workspace_id)
		);
CREATE TABLE columns
		(
			column_id serial PRIMARY KEY,	
			column_name VARCHAR ( 255 ) NOT NULL,
			column_placement INT NOT NULL,
			board_id INT NOT NULL,
			FOREIGN KEY (board_id) 
				REFERENCES boards (board_id)
		);
CREATE TABLE tasks 
		(
			task_id serial PRIMARY KEY,
			task_name VARCHAR ( 255 ),
			description VARCHAR ( 255 ),
			task_placement INT NOT NULL,
			color VARCHAR ( 255 ),
			column_number INT NOT NULL,
			column_id INT NOT NULL,
			creator_id INT,
			FOREIGN KEY (column_id)
				REFERENCES columns (column_id),
			FOREIGN KEY (creator_id) 
				REFERENCES users (id)
		);