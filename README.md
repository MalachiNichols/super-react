# Hello
This is a personal project based on a group project based on a personal project... uh, anyways you can check it out at https://kanban.123409876.xyz!

# Usage
If you want to mess with source on your own, to run the project open a terminal and cd into `.../super-react/server` and run `node index.js`, then open a second terminal and cd into `.../super-react/client` and run `npm start`. The latter should automatically open a window in your default browser directing to the app (note this will launch the react app in dev mode), but if it doesn't, you can open a browser and go to the url `localhost:3000`. You will have populate the .env variables and host your own db. You can use the structure as it is detailed in `db_structure.sql`

# Stack 
The frontend is React with MUI for styling and customized components. The backend server is Express hooked up to a postgres db I run locally. 

# todo
1. some form of user state to display username in navbar on signin. 
    most likely stored in app.js, and pass state variable into navbar,
    and give SignIn component access to setter for said state variable.
2. custom alert components for signup and signin
3. add express-bouncer to project to protect brute-force logins
