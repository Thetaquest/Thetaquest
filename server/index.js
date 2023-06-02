// var express = require('express');
// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var cors = require('cors');

// [SH] Bring in the data model
// require('./models/db');


// [SH] Bring in the routes for the API (delete the default routes)
// var routesApi = require('./routes/index');

// var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev')); 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors());

// [SH] Use the API routes when path starts with /api
// app.use('/api', routesApi);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// [SH] Catch unauthorised errors
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });



const express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

require('./config/database')
const userRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const challengeRouter = require('./routes/challenge'); 
const quizRouter = require('./routes/quiz');
const reportRouter=require('./routes/reports');
const app = express()
const port = process.env.PORT || 3000



app.use(cors())
app.use(express.json()) 
app.use('/api/v1/user',userRouter)
app.use('/api/v1/student',studentRouter)
app.use('/api/v1/challenge',challengeRouter)      
app.use('/api/v1/teacher',teacherRouter)
app.use('/api/v1/quiz',quizRouter)      
app.use('/api/v1/reports',reportRouter) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
