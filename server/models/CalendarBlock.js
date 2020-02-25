import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const CalendarBlock = new Schema(
  {
    events: [String],
    date: { type: Date, required: true },
    authorId: { type: ObjectId, ref: "User", required: true, immutable: true },
    userId: { type: ObjectId, ref: "User", required: true, immutable: true }
    // why did i reference user twice????? If it aint broke.
  },
  { timestamps: true }
);

export default CalendarBlock;
