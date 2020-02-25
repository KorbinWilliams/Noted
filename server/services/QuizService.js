import mongoose from "mongoose";
import Quiz from "../models/Quiz";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Quiz", Quiz);

class QuizService {
  async getAll() {
    let data = await _repository.find({});
    console.log(data);

    return data;
  }

  async getById(id) {
    let data = await _repository.findOne({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
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
      throw new ApiError("Invalid ID or you do not own this quiz", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this quiz", 400);
    }
  }
}

const _quizService = new QuizService();
export default _quizService;
