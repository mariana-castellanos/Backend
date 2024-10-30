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

const getPedidosByDomiciliario = `
  SELECT p.*, u.nombre, u.direccion, u.cel 
  FROM pedidos p
  JOIN usuarios u ON p.id_cliente = u.id
  WHERE p.id_domiciliario = $1 AND p.estado = $2;
`;

const getPedidosByCliente = `
  SELECT p.*, u.nombre, u.direccion, u.cel 
  FROM pedidos p
  JOIN usuarios u ON p.id_cliente = u.id
  WHERE p.id_cliente = $1 AND p.estado = $2;
`;

const updateStadoPedido = `
 UPDATE pedidos SET estado = $1 
 WHERE id_pedido = $2 RETURNING *
`

const getEmailByIdPedido = `
 SELECT usuarios.correo, usuarios.nombre, pedidos.id_pedido FROM pedidos 
       JOIN usuarios ON pedidos.id_cliente = usuarios.id 
       WHERE pedidos.id_pedido = $1
`
module.exports = {
    getDomiciliarioMenosPedidos,
    createPedido,
    addProductoToPedido,
    incrementarPedidosDomiciliario,
    getPedidosByDomiciliario,
    updateStadoPedido,
    getEmailByIdPedido,
    getPedidosByCliente
};