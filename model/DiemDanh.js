const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DiemDanhSchema = new Schema({
  Ngay: {
    type: String,
  },
  Time:String,
  ClassID: String,
  TenSinhVien: String,
  StudentID: String,
  TenLop:String,
  MaLop: String,
  MaGV: String,
});
const DiemDanh = mongoose.model("DiemDanh", DiemDanhSchema);
module.exports = DiemDanh;
