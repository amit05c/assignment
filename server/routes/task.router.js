
const Router = require("express")
const {addTask, listTask, deleteTask, singleTask, updateTask, addImage} = require("../controller/task.controller")
const router = Router();

router.post("/add", addTask);
router.post("/add/image", addImage);
router.get("/list", listTask);
router.get("/task/:id", singleTask);
router.delete("/delete/:id", deleteTask);
router.put("/task_update/:id", updateTask);
module.exports={
    router
}

