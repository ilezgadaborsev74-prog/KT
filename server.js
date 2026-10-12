const express = require("express");
const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const User = require("./models/User");

const PORT = 5000;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/school")
  .then(() => {
    console.log("Успешное подключение к БД");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
  });

app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
    console.log(subjects);
  } catch (error) {
    console.log("Ошибка при получении предметов: " + error);
  }
});

app.get("/subjects/:id", async (req, res) => {
  try{
    const {id} = req.params

    const subject = await Subject.findById(id)
    if (!subject) {
      res.send("Такой предмет не найден")
    }
    res.json(subject)

  }catch(error){
    console.log("Такой предмет не найден: " , error);
    
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log(users);
  } catch (error) {
    console.log("Ошибка при получении пользователей: " + error);
  }
});

app.post("/adduser", async (req,res) => {
    try {
      const { name, lastname, age } = req.body;
      const newUser = await User.create({
        name, 
        lastname, 
        age
      });

      await newUser.save();
      res.send("Пользователь успешно добавлен!");
    } catch (error) {
      console.log("Не удалось добавить пользователя: " , error);
    }
    })

app.post("/addsubject", async (req, res) => {
  try {
    const { title, teacher, hours , grade } = req.body;
  const newSubject = await Subject.create({
    title,
    teacher,
    hours,
    grade
  });

  await newSubject.save();
  res.send("Предмет успешно добавлен!");
  } catch (error) {
    console.log("Не удалось добавить предмет" , error);
    
    
  }
  
});

app.patch("/subject/:id" , async (req,res)=>{
  try{
    const {id} = req.params
    const {title, teacher, hours , grade} = req.body

    const updatesubject = await Subject.findByIdAndUpdate(id , {title, teacher, hours , grade})
    if (!updatesubject) {
      res.send("Такой предмет не найден")
    }
    res.send("Предмет успешно обновлен")

  }catch(error){
    console.log("Ошибка при обновлении предмета: " , error);
    
  }
})



app.delete("/deletesubject/:id" , async (req , res)=>{
    try{
        const {id} = req.params
        
        const subject = await Subject.findByIdAndDelete(id)
        if (!subject) {
          res.send("Такой предмет не найден")
        }
        res.send("Предмет успешно удален!")
    }catch(error){
        console.log("Ошибка при удалении предмета: " + error);
        
    }
})

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});