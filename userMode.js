const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      ingredientes: {
        type: String
      },
      pasos: {
        type: String
      }
    },
    {
        timestamps:true,
        versionKey: false,
    }
)

const ModelUser = mongoose.model("users", userSchema);
module.exports = ModelUser;