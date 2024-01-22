import mongoose from "mongoose";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getData = asyncHandler(async(req,res)=>{

  const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
  
  res.json(new ApiResponse(200,data,"Success"))
})

const getDataByWingName = asyncHandler(async(req,res)=>{
  const {hall,wing}=req.body
  

    const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
   
    // console.log(data[0][hall][wing]);
    // const hallEntry = data.find(entry => entry[hall];
    // console.log(hallEntry);

  
    const students = data[0][hall][wing];
    if(!students){
        throw new ApiError(404,"No data found")
    }
    res.json(new ApiResponse(200,students,"Success"))
    
})

const getDataByWingiesOrNot = asyncHandler(async(req,res)=>{

    const {rollNumber1,rollNumber2}=req.body
    const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
    const findStudentById = (data, id) => {
      for (const entry of data) {
        
        const halls = Object.keys(entry);
        for (const hall of halls) {
          const wings = Object.keys(entry[hall]);
          // console.log(wings);
          for (const wing of wings) {
            const students = entry[hall][wing];
            const student = students.find((student) => student.i === id);
            //  console.log(student);
            if (student) {
             return {
                hall,
                wing,
                student

              };
            }
          }
        }
      }
      return null;
    };
  
    // Search for the student by ID
    const result1 = findStudentById(data, rollNumber1);
    const result2 = findStudentById(data, rollNumber2);

  // console.log(result);
    if (result1 && result2) {
     if(result1["hall"]==result2["hall"] && result1["wing"]==result2["wing"]){
        res.json({ success: true, message: 'Students are of same wing', result1, result2 });
    }
    else{
        res.status(404).json({ success: false, message: 'Student are not of same wing' });
    }
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }

    
})

const getroomies = asyncHandler(async(req,res)=>{
   const {rollNumber1}=req.body
  const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
  const findStudentById = (data, id) => {
    for (const entry of data) {
      
      const halls = Object.keys(entry);
      for (const hall of halls) {
        const wings = Object.keys(entry[hall]);
        // console.log(wings);
        for (const wing of wings) {
          const students = entry[hall][wing];
          const student = students.find((student) => student.i === id);
          //  console.log(student);
          if (student) {
           return {
              hall,
              wing,
              student

            };
          }
        }
      }
    }
    return null;
  };

  // Search for the student by ID
  const result1 = findStudentById(data, rollNumber1);
  if(result1){
    
    const roomie = data[0][result1["hall"]][result1["wing"]].filter((student)=>{
      return student.i!=result1["student"].i && student.r==result1["student"].r
    })
    res.json({ success: true, message: 'Student found', roomie });
  }
  else{
    res.status(404).json({ success: false, message: 'Student not found' });
  }
})

export {
    getData,
    getDataByWingName,
    getDataByWingiesOrNot,
    getroomies
}