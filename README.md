# ThetaQuest

ThetaQuest is a learning platform that uses blockchain technology for a secure educational experience. An escrow contract handles transactions and ensures funds are secure. ThetaQuest is a community that connects students with peers and educators to collaborate and learn together.

## Development server for the Thetaquest App workthrough
- `npm install`
 - Ensure you have truffle installed on your system and Metamask install on your chrome browser
 - run `truffle compile`
 - run `truffle migrate --reset` or `truffle migrate --network theta_testnet`

Before starting the application, first create a database in mongo named "quizzards"
<br/>
To start the Server :
<br/>
 run ` npm install `

Open another terminal
1. `cd server`<br/>
run ` npm install `
2. `node index.js`
   <br/>


To run the application on the browser: Back to your first terminal<br/>


4. ` ng serve ` or ` npm start ` <br/>
5. Navigate to `http://localhost:4200/`.

## Features

<!-- 1. Used JWT for login -->
1.user can login
2. The user can play a quiz only once
3. On submitting a quiz, the user is redirected to the feedback page. Here the student cannot redirect back to the Quiz.
4. Chatbot is provided, so new users can easily navigate through the appication
5. Teachers can get an overview of student's performances with the help of charts.


