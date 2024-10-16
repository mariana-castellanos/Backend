const pool = require('../../db')
const queries = require('./queries')


const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        const existUsuario = await pool.query(queries.getUser,  [email]);
        
        if (existUsuario.rows.length ===0) {
            
        return res.status(400).json({message: "Credenciales incorrectas" + email})
        }
        if (password === existUsuario.rows[0].contraseña) {
            const userData = {
                id_usuario: existUsuario.rows[0].id,
                name: existUsuario.rows[0].nombre,
                role: existUsuario.rows[0].rol
            };
            console.log ("Inicio de sesion exitoso")
           res.status(200).json({message: "Inicio de sesion exitoso",
            userData,
           })
        } else {
            res.status(400).json({message: "Contraseña incorrecta"})
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: "Error en el servidor"});
    }
};

const register = async (req, res) => {
    const { nombre, email, password, role = 'cliente' } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existUsuario = await pool.query(queries.getUser, [email]);
  
      if (existUsuario.rows.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      // Insertar el nuevo usuario en la base de datos
      const newUser = await pool.query(queries.createUser, [nombre, email, password, role]);
  
      console.log("Usuario registrado exitosamente");
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        userData: newUser.rows[0],  // Retorna los datos del nuevo usuario
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    } 
  };



 module.exports = {
    login,
    register,
 }