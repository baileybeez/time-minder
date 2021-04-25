// 
//
// BaileyBeez

class UserManager {
   constructor() {
      this._userMap = {}
   }

   add(user) {
      if (user.Id in this._userMap)
         console.log(`INFO: Id '${user.Id}' already present in cache -> updating entry`)

      this._userMap[user.Id] = user
   }

   get(id) {
      if (id <= 0)
         return null
         
      return this._userMap[id]
   }
}

module.exports = UserManager