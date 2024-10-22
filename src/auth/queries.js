const getUser = "SELECT * FROM usuarios WHERE correo = $1;"
const createUser = `
    INSERT INTO usuarios (nombre, correo, contraseña,  apellido, direccion, rol) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *; `;


module.exports = {
    getUser,
    createUser
}