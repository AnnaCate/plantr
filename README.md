# 🌱 plantr

A MERN web app to help you plan your edible garden.

⚠️Note: all existing plant information is dummy data and should not actually be used to inform your garden plans.

## Motivation

This project was created to satisfy the final project requirements of [JRS Coding School](http://www.harborec.com/jrs-coding-school). The inspiration for the project came from the author's own experiences planning and organizing her backyard garden.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

In order to successfully install the project on your local machine, you will need to have already installed:

- [MongoDB](https://www.mongodb.com/)
- [nodemon](https://nodemon.io/)

### Installation

Once you have satisfied the prerequisites, follow these steps to install the project.

1. Clone the repo to your local machine

```
$ git clone https://github.com/AnnaCate/plantr.git

$ cd plantr
```

2. Install npm dependencies

```
$ npm install
```

3. Make sure MongoDB is running, then start the shell

```
$ mongod

$ mongo
```

4. In the mongo shell, use the db called `flora-files`

```
> use flora-files
```

5. Open `server/database/plants.json` and copy the entire array of objects. In the mongo shell, type `db.plants.insertMany()` and paste the entire array of plant data inside the parentheses. If the import was successful, you should receive a list of Object IDs.

6. Open a new tab or window in your terminal, and in the root directory, start the backend server

```
$ nodemon server/server.js
```

7. Open a new window or tab in your terminal, navigate to the root folder again, and start the frontend server

```
$ npm start
```

## Built With

- [React](https://reactjs.org/)
- [Reach Router](https://reach.tech/router)
- [AxiosJS](https://github.com/axios/axios)
- [PassportJS](http://www.passportjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [Bulma](https://bulma.io/)

## Still to come

- Refactor backend routes from `Promises` to `async/await`
- Refactor so that the array state of garden plants are in a parent element and passed to both `Garden` and `HomePage`, rather than called separately
- Re-organize folders
- Split `index.css` into component-specific files
- Move Hardiness Info Modal to its own component
- Allow user to edit email and username in `Profile`
- Add 'forgot password' feature to login page

## Author

Anna Fulton

## Acknowledgements

Shoutout to Brendt Bly for [this](https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367) helpful tutorial on implementing passportJS into a MERN app.

All images were downloaded from [Unsplash](https://unsplash.com/)

Many thanks to [Tyler Dillon](https://github.com/tydillon) for her suggestions on improving my UI.
