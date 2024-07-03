const express = require('express');
const mongoose = require('mongoose');
const ModelUser = require('./userMode');

const app = express();

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
});

router.get("/", async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const respuesta = await ModelUser.findById(id);
    res.send(respuesta);
});

router.put("/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body, { new: true });
    res.send(respuesta);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const respuesta = await ModelUser.deleteOne({ _id: id });
    res.send(respuesta);
});
app.use(express.json());
app.use(router);

// Manejar rutas inválidas
app.use((req, res, next) => {
    res.status(404).send({ error: "Route not found" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
});

// Conectar a MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://root:root@aplicacionesweb.6cvkiyx.mongodb.net/user_prueba');
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
