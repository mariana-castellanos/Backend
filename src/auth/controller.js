const pool = require('../../db')
const googleQueries = require('./googleQueries')
const queries = require("./queries")
const passport = require("passport");

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
    const { nombre, email, password, role, lastName, address = 'cliente' } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existUsuario = await pool.query(queries.getUser, [email]);
      
      if (existUsuario.rows.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      // Insertar el nuevo usuario en la base de datos
      

      const newUser = await pool.query(queries.createUser, [nombre, email, password,  lastName, address, role]);
    
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

 // Lógica para el login con Google
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Callback después de que Google devuelva el perfil del usuario
const googleCallback = async (req, res) => {
  try {
    const { id, correo, nombre } = req.user; // Datos proporcionados por Google

   
    // Verificar si el usuario ya existe en la base de datos
    let userResult = await googleQueries.getUser(correo);
    if (!userResult) {
      // Si el usuario no existe, lo creamos con el rol por defecto 'cliente' y sin contraseña
      const newUserResult = await googleQueries.createUser(
        nombre, // Nombre del usuario
        correo, // Correo del usuario
        "", // Contraseña vacía, ya que es un login con Google
        "cliente" // Rol por defecto
      );

      userResult = newUserResult;
    }

    const user = userResult;
    // Aquí puedes crear una sesión o devolver un token JWT
    const frontendRedirectURL = `http://localhost:3000/loginSuccess?user=${encodeURIComponent(JSON.stringify(user))}`;
    return res.redirect(frontendRedirectURL);

  } catch (error) {
    console.error("Error en Google login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

 module.exports = {
    login,
    register,
    googleAuth,
    googleCallback,     
 }