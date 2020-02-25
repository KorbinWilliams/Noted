import mongoose from "mongoose";
import Profile from "../models/Profile";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Profile", Profile);

class ProfileService {
  async getAll() {
    let data = await _repository.find()
    return data;
  }

  async getProfileByUserId(userId, uid) {
    let data = await _repository.findOne({ userId, authorId: uid })
    return data
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }

  async getById(id) {
    let data = await _repository.findOne({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }

  async edit(id, update, userId) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this profile", 400);
    }
    return data;
  }
}

const _profileService = new ProfileService();
export default _profileService;
