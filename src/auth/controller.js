const pool = require('../../db')
const queries = require('./queries')


const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        const existUsuario = await pool.query(queries.getUser,  [email]);
        console.log (email)
        if (existUsuario.rows.length ===0) {
            
        return res.status(400).json({message: "Credenciales incorrectas" + email})
        }
        if (password === existUsuario.rows[0].contraseña) {
           res.status(200).json({message: "Inicio de sesion exitoso"})
        } else {
            res.status(400).json({message: "Contraseña incorrecta"})
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: "Error en el servidor"});
    }
} 
 module.exports = {
    login
 }