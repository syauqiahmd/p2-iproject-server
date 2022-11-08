const { where } = require('sequelize')
const { hashedPassword } = require('../helpers')
const {User} = require('../models/index')

class userController{
  static async addUser(req, res, next){
    try {
      const {fullName, email, password, role, phoneNumber, address} = req.body
      const user = await User.create({fullName, email, password, role, phoneNumber, address})
      const responseData = {
        id : user.id,
        email : user.email
      }
      res.status(201).json(responseData)
    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req, res, next){
    try {
      let {id} = req.params
      const userFind = await User.findOne({where:{id}})
      
      if(!userFind){
        throw {name: "user_not_found"}
      }

      let {fullName, email, password, role, phoneNumber, address} = req.body
      password = hashedPassword(password)
      const user = await User.update({fullName, email, password, role, phoneNumber, address}, {
        where: {
          id: id
        }
      })
      const responseData = {
        id : id,
        email : email
      }
      res.status(201).json(responseData)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController