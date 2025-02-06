const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Middleware para parsear JSON

// Array temporal de productos
let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100, imagenUrl: 'http://example.com/imagen1.jpg' },
    { id: 2, nombre: 'Producto 2', precio: 200, imagenUrl: 'http://example.com/imagen2.jpg' },
];

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, imagenUrl } = req.body;
    if (!nombre || !precio || !imagenUrl) return res.status(400).json({ error: 'Nombre, precio e imagenUrl son requeridos' });

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        imagenUrl
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto por ID
app.put('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const { nombre, precio, imagenUrl } = req.body;
    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;
    if (imagenUrl) producto.imagenUrl = imagenUrl;

    res.json(producto);
});

// Eliminar un producto por ID
app.delete('/api/productos/:id', (req, res) => {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    productos.splice(index, 1);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
