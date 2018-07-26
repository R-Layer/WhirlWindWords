const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    bookIn: {
      type: Schema.Types.ObjectId,
      ref: "Book"
    },
    bookOut: {
      type: Schema.Types.ObjectId,
      ref: "Book"
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Request", requestSchema);
