const getDomiciliarioMenosPedidos = `
  SELECT id
  FROM usuarios
  WHERE rol = 'domiciliario'
  ORDER BY numero_pedidos ASC
  LIMIT 1;
`;

const createPedido = `
  INSERT INTO pedidos (id_cliente, id_domiciliario, total)
  VALUES ($1, $2, $3)
  RETURNING id_pedido;
`;

const addProductoToPedido = `
  INSERT INTO productos_pedido (id_producto, id_pedido, cantidad, precio)
  VALUES ($1, $2, $3, $4);
`;

const incrementarPedidosDomiciliario = `
  UPDATE usuarios
  SET numero_pedidos = numero_pedidos + 1
  WHERE id = $1;
`;

module.exports = {
    getDomiciliarioMenosPedidos,
    createPedido,
    addProductoToPedido,
    incrementarPedidosDomiciliario
};