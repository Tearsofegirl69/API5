const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      apellido: {
        type: String
      },
      edad: {
        type: Number
      },
      correo: {
        type: String
      },
      sexo: {
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