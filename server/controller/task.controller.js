
const {db} = require("../db")

const addTask = async (req, res) => {
  //   const [rows] = await db.query("SELECT * FROM customer");
  //   res.render("customers", { customers: rows });

  try {
    const { heading, description,image_id,priority } = req.body;
    console.log(priority)
    let sql = "INSERT INTO tasks (heading,description,image_id,priority) VALUES (?,?,?,?)"
    db.query(sql, [heading,description,image_id,+priority], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            // console.log(result);
            res.send(result)
        }
    })
    res.send(result); 
  } catch (error) {

  }
};

const listTask = async (req, res) => {
    try {
      const { priority } = req.query; // Assuming you pass the priority as a query parameter
  
      // let sql = "SELECT * FROM tasks WHERE deleted = 0"; // Add the condition for deleted = 0
      let sql = `
      SELECT tasks.*, images.image_url
      FROM tasks
      LEFT JOIN images ON tasks.image_id = images.image_id AND images.deleted = 0
      WHERE tasks.deleted = 0
    `;
      if (priority !== undefined) {
        // If priority is provided, add a condition to filter by priority
        sql += " AND priority = ?";
      }
      
      // Add an ORDER BY clause to sort by created_at in ascending order
      sql += " ORDER BY created_at DESC";
  
      db.query(sql, [priority], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const singleTask = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you pass the priority as a query parameter
  
      // let sql = "SELECT * FROM tasks WHERE deleted = 0"; // Add the condition for deleted = 0
      let sql = `
      SELECT tasks.*, images.image_url
      FROM tasks
      LEFT JOIN images ON tasks.image_id = images.image_id AND images.deleted = 0
      WHERE tasks.deleted = 0
    `;
      
      sql += " AND id = ?";
      
      
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const deleted =1
        let sql = "UPDATE tasks SET deleted = ? WHERE id = ?"
        db.query(sql, [deleted,id], (err,result) =>{err ? console.log(err) : res.send(result)})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description, image_name, priority } = req.body;
  
      // Start building the SQL query
      let sql = "UPDATE tasks SET";
      const values = [];
  
      // Check if each field is provided in req.body and add it to the SQL query
      if (heading !== undefined) {
        sql += " heading = ?,";
        values.push(heading);
      }
  
      if (description !== undefined) {
        sql += " description = ?,";
        values.push(description);
      }
  
      if (image_name !== undefined) {
        sql += " image_name = ?,";
        values.push(image_name);
      }
  
      if (priority !== undefined) {
        sql += " priority = ?,";
        values.push(priority);
      }
  
      // Remove the trailing comma and add the WHERE clause
      sql = sql.slice(0, -1); // Remove the trailing comma
      sql += " WHERE id = ?"; // Add the WHERE clause for the specific task id
      values.push(id); // Add the task id to the values array
  
      // Execute the SQL query
      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const addImage = async (req, res) => {
    //   const [rows] = await db.query("SELECT * FROM customer");
    //   res.render("customers", { customers: rows });
  
    try {
      const { image_url } = req.body;
      // console.log(priority)
      let sql = "INSERT INTO images (image_url) VALUES (?)"
      db.query(sql, [image_url], (err,result) =>{
          if (err) {
              console.log(err);
          }else{
              console.log(result);
              res.send(result) 
          }
      })
      res.send(result); 
    } catch (error) {
  
    }
  };
  
  

module.exports={
    addTask,
    listTask,
    deleteTask,
    singleTask,
    updateTask,
    addImage
}
