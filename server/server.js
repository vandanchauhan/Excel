// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var http = require('http')
 
// Configuration
mongoose.connect('mongodb://localhost/abc', {
  useMongoClient: true,
  /* other options */
});

//db = promise.databse;
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });
 
// Models
var Results = mongoose.model('Result', {
    details: Array
});
 
var Schema = mongoose.Schema;

var userSchema = new Schema({
    details : String
});

var User = mongoose.model('User', userSchema);
// Routes
 
    // create details and send back all detailss after creation

app.post('/api/results', function(req, res) {
 
        console.log("creating results");
        console.log(req.body);

         //    var u = new User({
          //          details: req.body[0]
          //      });

       //     u.save(function(err) {
        //        if (err)
         //          throw err;
          //      else 
           //        console.log('save user successfully...');
           // });

 //       create a review, information comes from request from Ionic
        User.create({
            details : req.body[0]
        }, function(err, result) {
            console.log(123);
            if (err)
                res.send(err);
            else
                res.send(result);
           }); 
 
        // //     // get and return all the reviews after you create another
        // //     // Review.find(function(err, reviews) {
        // //     //     if (err)
        // //     //         res.send(err)
        // //     //     res.json(reviews);
        //     // });
        //     console.log('Done');
        // });
        // console.log('Done');
});

    // app.post('/', function(req, res) {
 
    //     console.log("creating details");
    //     console.log(req.body);
    //     Result.create({
    //         details : req.body
    //     }, function(err, review) {
    //         console.log('created');
    //         if (err)
    //             res.send(err);
    //         else 
    //             console.log('success');    
    //     });
    //     // create a details, information comes from request from Ionic
    //         // get and return all the detailss after you create another
    //     //     details.find(function(err, detailss) {
    //     //         if (err)
    //     //             res.send(err)
    //     //         res.json(detailss);
    //     //     });
    //     // });
 
    // });
 
 
// listen (start app with node server.js) ======================================
// app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});