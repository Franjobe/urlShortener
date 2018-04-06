var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// CREATE THE COUNTER SCHEMA with an _id field and a seq field
var CounterSchema = new Schema({         // new schema o schema solo ?
  _id: {type: String, required: true},
  seq: { type: Number, default:10000 }
  });


// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);


// SCHEMA
var urlSchema = new Schema({
  _id: Number, //{type: Number, index: true},
  long_url: String,
  created_at: Date
});


// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  // find the url_count and increment it by 1
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      // set the _id of the urls collection to the incremented value of the counter
      doc._id = counter.seq;
      doc.created_at = new Date();
      next();
  });
});






var Url = mongoose.model('Url', urlSchema);
module.exports = Url;