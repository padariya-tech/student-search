import mongoose from "mongoose";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getData = asyncHandler(async(req,res)=>{

  const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
  if(!data){
    throw new ApiError(404,"No data found")
  }
  
  res.json(new ApiResponse(200,data,"get data"))
})

const getDataByWingName = asyncHandler(async(req,res)=>{
  const {hall,wing}=req.body
  
  if(!hall){
    throw new ApiError(400,"hall name required")
  }
  if(!wing){
    throw new ApiError(400,"wing name required")
  }

    const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
   
    // console.log(data[0][hall][wing]);
    // const hallEntry = data.find(entry => entry[hall];
    // console.log(hallEntry);
  if(!data){
    throw new ApiError(404,"No data found")
  }
  
    const students = data[0][hall][wing];
    if(!students){
        throw new ApiError(404,"No data found")
    }
    res.json(new ApiResponse(200,students,"get data by wing name"))
    
})

const getDataByWingiesOrNot = asyncHandler(async(req,res)=>{

    const {rollNumber1,rollNumber2}=req.body
    if(!rollNumber1){
        throw new ApiError(400,"rollNumber1 required")
    }
    if(!rollNumber2){
        throw new ApiError(400,"roll  Number2 required")
    }
    const data = await mongoose.connection.db.collection("student_data").find({}).toArray()
    if(!data){
        throw new ApiError(404,"No data found")
    }
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
      res.status(200).json(new ApiResponse(200,"Students of same wing"))
    }
    else{
        res.status(200).json(new ApiResponse(404,"Students of different wing"))
    }
    } else {
      res.status(200).json(new ApiResponse(404,"Student not found"))
    }

    
})

const getroomies = asyncHandler(async(req,res)=>{
   const {rollNumber}=req.body
   if(!rollNumber){
    throw new ApiError(400,"rollNumber  required")
   }
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
  const result1 = findStudentById(data, rollNumber);
  if(result1){
    
    const roomie = data[0][result1["hall"]][result1["wing"]].filter((student)=>{
      return student.i!=result1["student"].i && student.r==result1["student"].r
    })
    if(roomie.length==0){
      res.status(200).json(new ApiResponse(200,roomie,"roommates not found"));
    }
   else
   {
    res.status(200).json(new ApiResponse(200,roomie,"roommates found"));
   }
  }
  else{
    res.status(404).json(new ApiResponse(404,"student not found"));
  }
})

export {
    getData,
    getDataByWingName,
    getDataByWingiesOrNot,
    getroomies
}