![image](https://github.com/roy-radhakanta/habbit-tracker/assets/81176431/286870a6-451f-4f48-bc38-7ad6f3dc2659)


# Habit tracker

Every day habit tracker with 7days of changable history functionality

## Folder structure

- 📁assets
    - 📁css
    - 📁images
    - 📁js
- 📁config
- 📁controllers
- 📁models
- 📁routes
- 📁views

### ⚠️Dependencies
I have used Nodemon to run project
[![nodemon](https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png)](https://www.npmjs.com/package/nodemon)
```node
npm install -g nodemon
```
### 🌲Environmental Variables
`PORT=3000`
`MONGO_URL=<you live mongodb url>`

### ⚒️How to run the project
    1. Go to the project directory. Ex. in windows -> cd habittracker

    2. Create an .env file in the root directory and add PORT and MONGO_URL

***I have used live mongodb url***
like
```
mongodb+srv://<user name>:<password>@<cluster somthing>.<random id>.mongodb.net/<your_db_name>?retryWrites=true&w=majority
```
then run this command on the same directory
```node
npm install
```
then run
```node
nodemon
```
or

```node
npm run start
```
