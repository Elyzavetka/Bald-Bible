# Bald Bible

A Full-Stack MERN project, a Pinterest-style design supportive app, promoting positivity for bald individuals. Tech Stack: Javascript, React, Express, Node.js, MongoDB. Testing: Jest.
![Image Description](https://github.com/Elyzavetka/Bald-Bible/blob/main/Screenshot%202024-03-02%20at%2013.09.18.png)

## Run Bald Bible in dev mode
Start the frontend and backend servers together.
```
cd backend
npm start
```
Start the frontend server only.
```
npm run dev
```
Start the backend server only.
```
npm run backend
```

## MongoDB database password
Add a `config.js` file in the backend and add this to `.gitignore`.
Add the MongoDB password to `config.js`.
```
module.exports = {
  password: 'db-user-password' 
} 
```
