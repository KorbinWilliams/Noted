import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Question = new Schema(
  {
    description: { type: String, required: true, minlength: 10 },
    answer: { type: String },
    show: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Quiz = new Schema(
  {
    name: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    categories: { type: Array },
    questions: [Question]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     _listRepo.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Quiz;
