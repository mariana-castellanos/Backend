const express = require ("express")
const inventarioRoutes = require('./src/inventario/routes')
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/v1/inventario', inventarioRoutes);


app.get("/api/home", (req,res) => {
    res.json({message: "Hello World"});
});



app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
});