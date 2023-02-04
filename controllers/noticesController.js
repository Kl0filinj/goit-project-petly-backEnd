const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');

const { RequestError } = require("../helpers");
const { Notices } = require("../models/noticesModel");
const { User } = require("../models/userModel");

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findOne({ _id: id });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

// const getMyNotice = async (req, res) => {
//   const { _id } = req.user;

//   const myNotices = await Notices.find({ owner: _id });

//   if (!myNotices) {
//     throw RequestError(404, "Not found");
//   }
//   return res.status(200).json(result);
// };

const getMyNotice = async (req, res) => {
  const { _id } = req.user;

  const myNotices = await Notices.find({ owner: _id });

  if (!myNotices) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(myNotices);
};

const getFavoriteNotices = async (req, res) => {
  // const { _id } = req.user;

  // const favNotices = await User.find({ _id });

  // if (!favNotices) {
  //   throw RequestError(404, "Not found");
  // }
  return res.status(200).json({});
};

const deleteMyNotice = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;

  const deletedNotice = await Notices.findOneAndDelete({ owner: userId });

  if (!deletedNotice) {
    throw RequestError(404, "Notice not found");
  }

  await User.findByIdAndUpdate(
    userId,
    { $pull: { notices: noticeId } },
    { new: true }
  );
  await Notices.createIndex({ title: "text" });

  return res.status(200).json({ message: "Success" });
};

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { query } = req.query;
  const options =
    query === undefined
      ? { categoryName }
      : { categoryName, $text: { $search: query } };
  const result = await Notices.find(options);

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const addToFavorites = async (req, res) => {
  const userId = req.body.userId;
  const favId = req.params.id;
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { favorites: favId } },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(201).json(result);
};

// const removeFromFavorites = async (req, res) => {
//   // is it req.user._id or  const userId = req.body.userId?
//   //  const userId = req.body.userId;
//   const userId = req.user._id;
//   const favId = req.params.id;

//   const result = await User.findOneAndUpdate(
//     { _id: userId },
//     { $pull: { favorites: favId } },
//     { new: true }
//     );

//     if(!result) {
//       throw RequestError(404, "Not found");
//       }
//     return res.status(200).json(result);
// };
const removeFromFavorites = async (req, res) => {
  // is it req.user._id or  const userId = req.body.userId?
  //  const userId = req.body.userId;
  const userId = req.user._id;
  const favId = req.params.id;

  const result = await User.findOneAndRemove(
    { _id: userId },
    { $pull: { favorites: favId } },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const addNotice = async (req, res) => {
  const { _id: userID } = req.user

  let noticeImgURL = null;
  
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const filename = `${userID}_${originalname}`
    const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename }, function (error, result) {});
    const { secure_url } = result;
    await fs.unlink(tempUpload);
    noticeImgURL = secure_url;
  }
    
  const notice = new Notices({... req.body, photo: noticeImgURL, owner: userID});
  await notice.save();

  // const database = client.db("db-testDB");
  // console.log(database);
  // await Notices.createIndex({ title: "text" });
  return res.status(201).json(notice);
};

module.exports = {
  addNotice,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  getMyNotice,
  deleteMyNotice,
  getFavoriteNotices,
};
