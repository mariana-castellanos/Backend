const pool = require('../../db');
const queries = require('./queries');

// Crear pedido
const createPedido = async (req, res) => {
    const { cart, total, id_usuario } = req.body; // El carrito con productos y el total
    
    try {
        // Buscar el domiciliario con menos pedidos
        const domiciliario = await pool.query(queries.getDomiciliarioMenosPedidos);
        if (!domiciliario.rows.length) {
            return res.status(400).json({ message: "No hay domiciliarios disponibles" });
        }
        const id_domiciliario = domiciliario.rows[0].id;

        // Insertar el pedido
        const pedidoResult = await pool.query(queries.createPedido, [id_usuario, id_domiciliario, total]);
        const id_pedido = pedidoResult.rows[0].id_pedido;

        // Insertar los productos del pedido
        for (const producto of cart) {
            await pool.query(queries.addProductoToPedido, [producto.id_producto, id_pedido, producto.cantidad, producto.precio_producto]);
        }

        // Incrementar el número de pedidos del domiciliario
        await pool.query(queries.incrementarPedidosDomiciliario, [id_domiciliario]);

        res.status(200).json({ message: "Pedido creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ message: "Error al crear el pedido" });
    }
};

module.exports = {
    createPedido,
};