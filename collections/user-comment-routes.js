'use strict';

class UserComment {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (e) {
      console.error(`Error during the creation`);
      // console.error(e);
    }
  }

  async read(id) {
    try {
      if(id) {
        return await this.model.findOne({where: {id: id}});
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
      console.error(`Error in reading data with the id: ${id}`);
    }
  }

  async update(id, obj) {
    try {
      const dataById = await this.model.findOne({where: {id: id}});
      return await dataById.update(obj);
    } catch(e) {
      console.error(`Error while updating data with id: ${id}`);
      // console.error(e);
    }
  }

  async delete(id) {
    try {
      return await this.model.destroy({where: {id: id}});
    } catch(e) {
      // console.log(id);
      console.error(`Error while deleting the data with id: ${id}`);
    }
  }

  async readWithComment(Comment, id) {
    try {
      if (id) {
        return await this.model.findOne({where: {id: id}, include: Comment});
      }
      return await this.model.findAll({include: Comment});
    } catch(e) {
      console.error(`Error while reading the Comments for model `);
    }
  }

  async readWithCommentAndUser(Comment, id) {
    try {
      // if (id) {
      //   return await this.model.findOne({where: {id: id}, include: [Comment, User]});
      // }
      return await this.model.findAll({ where: {user_id: id} ,include: [Comment]});
    } catch(e) {
      console.error(`Error while reading the Comments for the user`);
    }
  }
}

module.exports = UserComment;
