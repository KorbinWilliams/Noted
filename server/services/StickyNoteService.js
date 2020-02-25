import mongoose from "mongoose";
import StickyNote from "../models/StickyNote";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("StickyNote", StickyNote);

class StickyNoteService {
  async getAll(userId) {
    let data = await _repository.find({ authorId: userId })
    return data;
  }

  // async getStickyNoteByUserId(userId, uid) {
  //   let data = await _repository.findOne({ userId, authorId: uid })
  //   return data
  // }

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
      throw new ApiError("Invalid ID or you do not own this stickyNote", 400);
    }
    return data;
  }
}

const _stickyNoteService = new StickyNoteService();
export default _stickyNoteService;
