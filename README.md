# React application with Express server and Sql Database

This project was bootstrapped with [mysql-nodejs-express-reactjs-redux](https://github.com/sanjeevpuspam/SERN). Then an Express server was added in the `server` directory. The server is proxied via the `proxy` key in `package.json`.

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/sanjeevpuspam/SERN.git
cd SERN
npm install
```

Create a `.env` file for environment variables in your server.

You can start the server on its own with the command:

```bash
npm run server
```

Run the React application on its own with the command:

```bash
npm start
```

Run both applications together with the command:

```bash
npm run dev
```

The React application will run on port 3000 and the server port 3006.

![alt OutPut Screen](https://github.com/sanjeevpuspam/SERN/blob/master/public/output.PNG)