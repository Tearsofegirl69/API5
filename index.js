const express = require('express');
const mongoose = require('mongoose');
const ModelUser = require('./userMode');

const app = express();

const router = express.Router();

router.post("/", async (req,res)=>{
    const body = req.body;
    const respuesta = await ModelUser.create(body)
    res.send(respuesta);
})

router.get("/", async (req, res) =>{
    const respuesta = await ModelUser.find({})
    res.send(respuesta);
})


router.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id)
    res.send(respuesta);
})

router.put("/:id", async (req, res) =>{
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({_id: id}, body)
    res.send(respuesta);
})


router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id: id})
    res.send(respuesta);
})



app.use(express.json())
app.use(router)
// Conectar a MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/user_prueba');
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
}
connectDB();

// Iniciar el servidor

app.listen(3001, () => {
    console.log("El servidor está en el puerto 3001");
});
