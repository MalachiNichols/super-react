# Hello
This is a personal project based on a group project based on a personal project... uh, anyways

# Usage
Currently, there is no hosted database. I run my own local postgres db for developing. So, you can't really use the application. (unless of course you host your own local db with the exact table layout that I have created. Good luck!) If you do happen to have your own db with the exact table layout that I have created, then to run the project open a terminal and cd into `.../super-react/server` and run `node index.js`, then open a second terminal and cd into `.../super-react/client` and run `npm start`. the latter should automatically open a window in your default browser directing to the app, but if it doesn't, you can open a browser and go to the url `localhost:3000`.

# Stack 
The frontend is React with MUI for styling and customized components. The backend server is Express hooked up to a postgres db I run locally. 

# todo
1. some form of user state to display username in navbar on signin. 
    most likely stored in app.js, and pass state variable into navbar,
    and give SignIn component access to setter for said state variable.
2. custom alert components for signup and signin
