##                  DOCUMENTACIÓN PROYECTO API REST MULTIMEDIA
___
###                         Empezando el proyecto (DEPENDENCIAS)

- Empezamos instalando un nuevo proyecto con **npm init -y** , y despues instalamos todos los modulos necesarios.
- En Desarrollo vamos a instalar typescript y los @types para la autoayuda

> **NOTA:** lo mejor es mirar el package.jon al final para ver las dependencias que se añadieron tanto en producción como en desarrollo.
___
###                       Compilando el TypeScript

- Lo primero es crear el tsconfig.json con el comando:
>  npx tsc --init 

- Una vez creado el tsconfig.json en él tenemos que indicar de que carpetas a qué carpetas vamos a compilar el ts:

>  "rootDir": "./src",   
    "outDir": "./dist",    
	 "target": "es6",   

- El target será la version de javascript a la que va a compilar el typescript una vez generado el .js. 
- La opcion outDir indica la carpeta a donde va a guardar los javascript compilados una vez ejecutemos en comando npm build.
- La opcion rootDir indica el directorio de entrada que va mirar de forma recursiva para compilar el TypeScript.

- Despues debemos configurar la zona de scripts del package.json.En el script "dev" vamos a arrancar el servidor que hemos traido del modulo ts-node-dev(dev" :"ts-node-dev src/index.ts")("build":"tsc")
___
###                          Creando la estructura de archivos y carpetas del proyecto

- Vamos a crear una carpeta principal 'src' y dentro varias subcarpetas.Empezaremos por routes,controllers,models,middlewares,database,services y config.

- Podemos realizar importaciones utilizando tanto el import como el require.Con Require si se puede entrar hasta la propiedad de un objeto con doble destructuring. Con import no se puede.

> import {sistema} from './config/config';  <- esta no puede entrar hasta la propiedad
//const {sistema:{PORT}} = require('./config/config')

> Importante: el .env y el .gitignore van a la misma altura que la carpeta raiz del proyecto(no dentro).

- Dentro de la carpeta routes vamos a poner las rutas(endpoints) de la API. La funcionalidad de las rutas la pondremos en la carpeta de los controladores('controllers')

- La conexion la pondremos en la carpeta database(archivo condexionmongodb.ts)
- Los Schemas y modelos van a ir en la carpeta models. 

> Nota sobre Codigos HTTP : no se puede tirar un 204 si queremos mandar algo como respuesta en él, hay que tener cuidado con esto, un código 204 no permite adjuntar nada en el retorno.
___
###          CREANDO USUARIOS DESDE CLI(npm run create después de un npm run buid)

- Podemos crear un usuario con el comando que use como tercer argumento 'create',pero primero hay que hacer un build,(lo voy a dejar en npm run create,recuerda primero va un npm run build):
> "scripts": {
    "dev": "ts-node-dev src",
    "create": "node dist/index.js create",
    "build": "tsc"
  },          
- Los problemas que tuve fueron porque compila a javascript,y estaba llamando a node dist/index.ts cuando nunca va a existir typescript tras compilar al estático.
- Código que dispara la API CLI:
> process.env.argv[2] === ('create') && require('./database/create')();
___
###          GESTIÓN DE USUARIOS DESDE LA API REST

- Para crear un usuario desde la API REST sólo lo puede hacer un ADMIN,el cual se puede crear por consola fácilmente.Tendrá que tener un TOKEN válido,lógicamente.Adicionalmente,toda la gestión de usuarios(consulta,borrado o actualización de los mismos) también debe ser gestionada por un ADMIN.
- El login lo puede intentar cualquier usuario,pero deberán cumplirse las reglas de acceso(password proporcionada igual a la existente encriptada y username único existente).        
___
###             GESTIÓN DE ELEMENTOS ANIDADOS 

- Cuando se quiera montar/anidar una lista de reproducción a una pantalla o un elemento Multimedia a una lista de reproducción el endpoint siempre va a ser /api/device/insertar/DeviceId siendo el device el objeto receptor.Por ejemplo /api/pantallas/insertarLista/pantallaID insertará una lista a esa pantalla.Por el cuerpo de la petición vendrá el ID de la lista a insertar.
___
###          PROPIEDADES DE LOS MODELOS

- Un Usuario tendrá estas 4 propiedades:
  1. username
  2. email
  3. password
  4. tipo

- Una Pantalla tendrá estas propiedades:
  1. nombre
  2. descripcion
  3. marca
  4. modelo
  5. orientacion
  6. resolucion
  7. location
  8. listas

- Una Lista tendrá estas propiedades:
  1. nombre
  2. descripcion
  3. multimedias  

- Un Multimedia tendrá estas propiedades:
  1. tipo
  2. url
  3. resolucion
  4. relacionAspecto
  5. duracion 
  6. titulo
  7. descripcion

> ***Queda supeditado añadir/eliminar propiedades a necesidades de la aplicación***
___  