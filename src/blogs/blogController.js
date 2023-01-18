const express = require("express");
const BlogsService = require("./blogsService");

module.exports = class BlogsController {
  path = "/blog";
  router = express.Router();
  blogService = new BlogsService();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) =>
      this.blogService.getAllBlogs(req, res)
    );
    this.router.post(`${this.path}`, (req, res) =>
      this.blogService.createBlog(req, res)
    );
    this.router.put(`${this.path}`, (req, res) =>
      this.blogService.updateBlog(req, res)
    );
    this.router.delete(`${this.path}/:id`, (req, res) =>
      this.blogService.deleteBlog(req, res)
    );
  }
};
