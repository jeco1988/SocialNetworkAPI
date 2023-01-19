const { Schema, model, Types } = require('mongoose');

// importing moment - format timestamp
const moment = require('moment')

//reaction Schema
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("DD MMM, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

//thought Schema
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("DD MMM, YYYY [at] hh:mm a"),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


//get total friend #
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;