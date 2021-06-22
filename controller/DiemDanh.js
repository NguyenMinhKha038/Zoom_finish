const bcrypt = require("bcrypt");
const { Session } = require("express-session");
const Teacher = require("../model/Teacher");
const Student = require("../model/Student");
const DiemDanh = require("../model/DiemDanh");

module.exports = async(req, res) => {
  console.log("teacher: ",req.session.TeacherID);
  console.log("class: ",req.session.ClassID);
  const diemdanh =await DiemDanh.find({ MaLop: req.session.ClassID });
  console.log("Diem danh: ",diemdanh);
  res.render("viewDiemDanh.ejs", {
    
    diemdanh: diemdanh
  });
  // if (TeacherloggedIn == null) {
  //   Student.findOne({ Email: req.session.StudentID }, (error, profile) => {
  //     //console.log(Teacher.Email);
  //     if (profile) {
  //       res.render("Profile.ejs", {
  //         Profile: profile,
  //       });
  //     } else {
  //       console.log("Khong ton tai Teacher");
  //     }
  //   });
  // }
};
