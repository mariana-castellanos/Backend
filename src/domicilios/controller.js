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


const getPedidosDomiciliario = async (req, res) => {
    const { id_domiciliario, estado } = req.query;
  
    try {
      const results = await pool.query(queries.getPedidosByDomiciliario, [id_domiciliario, estado]);
      res.status(200).json(results.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor al obtener pedidos' });
    }
  };

  const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; // Recibimos el nuevo estado del frontend
  
    try {
      const result = await pool.query(
        queries.updateStadoPedido,
        [estado, id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Pedido actualizado correctamente" });
      } else {
        res.status(404).json({ message: "Pedido no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  

module.exports = {
    createPedido,
    getPedidosDomiciliario,
    updatePedido
};