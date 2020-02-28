import mongoose from "mongoose";
import CalendarBlock from "../models/CalendarBlock";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("CalendarBlock", CalendarBlock);

class CalendarBlockService {
  async getAll(userId) {
    let data = await _repository.find({ authorId: userId });
    console.log(data);
    return data;
  }

  async getById(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }

  async getByDate(date) {
    let data = await _repository.findOne({ date: date })
    if (!data) {
      throw new ApiError("Invalid Id");
    }
    return data
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this calendarBlock", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this calendarBlock", 400);
    }
  }
}

const _calendarBlockService = new CalendarBlockService();
export default _calendarBlockService;
