import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  id:          {type: String, required: true, unique: true},
  user:        {type: String}, // not used yet
  title:       {type: String, required: true},
  description: {type: String, required: true},
  choices:     [
    {
      _id:   false,
      id:    {type: String, required: true},
      title: {type: String, required: true},
      count: {type: Number, required: true, default: 0}
    }
  ]
});

VoteSchema.methods.snapshot = function() {
  return {
    id:          this.id,
    user:        this.user,
    title:       this.title,
    description: this.description,
    choices:     this.choices
  }
};

const VoteModel = mongoose.model('VoteModel', VoteSchema);

const MongoDbVoteDatabase = {
  getAllVotes(callback) {
    VoteModel.find({}, function(err, result) {
      if (err) {
        return callback(err);
      }

      return callback(null, result.map((vote) => vote.snapshot()));
    });
  },

  getVoteById(id, callback) {
    VoteModel.findOne({'id': id}, function(err, vote) {
      if (err) {
        return callback(err);
      }
      callback(null, (vote ? vote.snapshot() : null));
    });
  },

  store(vote, callback) {
    if (!vote.id) {
      vote.id = mongoose.Types.ObjectId().toString();
      const mongoVote = new VoteModel(vote);
      return mongoVote.save(function(err, newVote) {
        if (err) {
          return callback(err);
        }
        return callback(null, newVote.snapshot());
      });
    }

    VoteModel.findOneAndUpdate({'id': vote.id}, vote, {'new': 'true'}, function(err, update) {
      if (err) {
        return callback(err);
      }
      return callback(null, update.snapshot());
    });

  }
};

export default {
  create(callback) {
    const url = `mongodb://localhost/vote-db`;
    console.log(`Connecting to '${url}'`);
    mongoose.connect(url, {}, (err) => {
      return callback(err, MongoDbVoteDatabase);
    });
  }
};

