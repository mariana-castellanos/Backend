const getUser = "SELECT * FROM usuarios WHERE correo = $1"

module.exports = {
    getUser,
}