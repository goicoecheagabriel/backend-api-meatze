import express from 'express';
import morgan from 'morgan';
import { sistema } from './config/config';
import cors from 'cors';
import pantallaRoutes from './routes/pantallas.routes';
import listaRoutes from './routes/listas.routes';
import multimediaRoutes from './routes/multimedias.routes';
import usuarioRoutes from './routes/users.routes';


/*---- Inicializaciones ----*/
const app = express();
app.set('port',sistema.PORT);
require('./database/conexionmongodb');

// process.argv[2] === ('create') && require('./database/deployInitialDb.js')(); 
process.argv[2] === ('create') && require('./database/create')(); 


/*---- Middlewares ---*/
app.use(morgan('dev'));
app.use(cors()); 
app.use(express.json()); //habilitar formato JSON
app.use(express.urlencoded({ extended:false }));

/*---- Routes */

app.use('/api',pantallaRoutes);
app.use('/api',listaRoutes);
app.use('/api',multimediaRoutes);
app.use('/api',usuarioRoutes);

app.use('/',(req,res) => {
    res.status(403).send("Acceso No Autorizado");
})

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);    
})