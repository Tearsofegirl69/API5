const express = require("express");
const mongoose = require("mongoose");
const ModelUser = require("./userMode");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const router = express.Router();
app.use(router);

// Conectar a MongoDB
async function connectDB() {
	try {
		await mongoose.connect(
			"mongodb+srv://root:root@aplicacionesweb.6cvkiyx.mongodb.net/user_prueba"
		);
		console.log("Conexión a MongoDB exitosa");
	} catch (error) {
		console.error("Error al conectar a MongoDB", error);
		process.exit(1);
	}
}
connectDB();

// Ruta para insertar un corredor
router.post("/", async (req, res) => {
	const body = req.body;
	const respuesta = await ModelUser.create(body)
		.then((data) => {
			console.log("Se insertó un usuario");
			res.send(data);
		})
		.catch((e) => {
			console.log(`Error: ${e}`);
		});
});

// Ruta para obtener todos los corredores
router.get("/", async (req, res) => {
	const respuesta = await ModelUser.find({})
		.then((data) => {
			res.send(data);
		})
		.catch((e) => {
			console.log(`Error: ${e}`);
		});
});

// Ruta para obtener un corredor por ID
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({ error: "Invalid ID format" });
	}
	const respuesta = await ModelUser.findById(id)
		.then((data) => {
			res.send(data);
		})
		.catch((e) => {
			console.log(`Error: ${e}`);
		});
});

// Ruta para actualizar un corredor
router.put("/:id", async (req, res) => {
	const body = req.body;
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({ error: "Invalid ID format" });
	}
	const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body, {
		new: true,
	})
		.then((data) => {
			res.send(data);
		})
		.catch((e) => {
			console.log(`Error: ${e}`);
		});
});

// Ruta para eliminar un corredor
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({ error: "Invalid ID format" });
	}
	const respuesta = await ModelUser.deleteOne({ _id: id })
		.then((data) => {
			console.log("Se eliminó el usuario");
			res.send(data);
		})
		.catch((e) => {
			console.log(`Error: ${e}`);
		});
});

// Manejar rutas inválidas
app.use((req, res, next) => {
	res.status(404).send({ error: "Route not found" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ error: "Something went wrong!" });
});

// Iniciar el servidor
app.listen(3001, () => {
	console.log("El servidor está en el puerto 3001");
});
