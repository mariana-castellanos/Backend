const getUser = "SELECT * FROM usuarios WHERE correo = $1"
const createUser = `
    INSERT INTO usuarios (nombre, correo, contraseña, rol) 
    VALUES ($1, $2, $3, $4)
    RETURNING *; `;


module.exports = {
    getUser,
    createUser
}