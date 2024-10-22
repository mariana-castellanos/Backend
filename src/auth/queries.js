const getUser = "SELECT * FROM usuarios WHERE correo = $1;"
const createUser = `
    INSERT INTO usuarios (nombre, correo, contraseña,  apellido, direccion, cel, rol) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *; `;


module.exports = {
    getUser,
    createUser
}