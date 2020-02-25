import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Profile = new Schema(
  {
    name: { type: String, required: true, immutable: true },
    email: { type: String, required: true },
    userImage: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lakeyboy_Silhouette.PNG" },
    jobTitle: { type: String },
    jobSkills: { type: String },
    interviewerStatus: { type: Boolean, default: true },
    intervieweeStatus: { type: Boolean, default: true },
    authorId: { type: ObjectId, ref: "User", required: true, immutable: true },
    userId: { type: ObjectId, ref: "User", required: true, immutable: true }
  },
  { timestamps: true }
);

export default Profile;
