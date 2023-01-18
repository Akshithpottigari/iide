const mysql = require("mysql");
const App = require("../app");
const { database } = require("../config");
module.exports = class BlogsService {
  dbConnection = new App().dbConnection;

  getAllBlogs(req, res) {
    this.dbConnection.query('select * from blog'),
      (err, result) => {
        console.log('first')
        if (err) {
          console.log('err: ', err);
          res.send({ message: "error while querying" });
        } else {
          res.send({ message: "success", result: result });
          console.log('result: ', result);
        }
      };
  }

  createBlog(req, res) {
    let query = `INSERT INTO ${database} (title, description) VALUES (?,?)`;
    let { title, description } = req.body;
    this.dbConnection.query(query, [title, description], (err, result) => {
      console.log('err: ', err);
      if (err) {
        res.send({ message: "Error while creating blog" });
      } else {
        res.send({ message: "Created", result: result });
      }
    });
  }

  updateBlog(req, res) {
    let { title, description, id } = req.body;
    let query = `UPDATE ${database} SET title = ?, description = ? WHERE id = ?`;
    this.dbConnection.query(query, [title, description, id], (err, result) => {
      if (err) {
        res.send({ message: "Error while updating blog" });
      } else {
        res.send({ message: "Updated", result: result });
      }
    });
  }

  deleteBlog(req, res) {
    let { id } = req.params;
    let query = `DELETE FROM Blog WHERE id = ?`;
    this.dbConnection.query(query, [id], (err, result) => {
      if (err) {
        console.log('err: ', err);
        res.send({ message: "Error while deleting blog" });
      } else {
        res.send({ message: "Deleted", result: result });
      }
    });
  }
};
