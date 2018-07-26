const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    bookStatus: {
      exchangeable: {
        type: Boolean,
        default: false
      },
      exchanged: {
        type: Date,
        default: null
      },
      applicants: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);
