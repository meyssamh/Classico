## Classico

Classico is a responsive website developed by Node.js, Express.js, MongoDB, React and Sass. This website also is designed by Adobe XD.
The Backend will run on `localhost:8080` and the Frontend will run on `localhost:3000`.

### Install

Before starting the project you have to run `npm install` in both `api` and `client` folders.

### Start

To start the project you have to first make a connection with your MongoDB at `localhost: 27017`.
After that, you can run the api and the client with `npm start`. Open each folder in Command Prompt and type *npm start* and press the `Enter` key.

The UI files are placed in the `ui` folder. You can open the with Adobe XD CC version 24 or later.

### Caution

The design is originally made best for `1366 x 768` and `320 x 568` screens. The design may have problems if your device has another screen size.

For using the Nodemailer you have to generate an api_key by SendGrid and copy it to the `auth.js` file in the `controllers` folder.
After that, you need to comment out the nodemailer codes in the same file!

The games used in this website are modified versions of [react-snake](https://github.com/werein/react-snake) and [react-pong](https://davidkrpt.github.io/react-pong/).
