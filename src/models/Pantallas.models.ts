import {Schema, model} from 'mongoose';

const pantallaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: {
        type: String,
        trim: true,
        required: true,
        unique:true,
    },
    descripcion:{
        type: String,
        trim: true
    },
    marca:{
        type: String,
        trim: true
    },
    modelo:{
        type: String,
        trim: true
    },
    orientacion:{
        type: String,
        enum: ['HORIZONTAL', 'VERTICAL'],
        default: 'HORIZONTAL',
        // validate:[function(orientacion):any{
         
        //    return false;
        // },("Solo se admiten HORIZONTAL Y VERTICAL")],
    },

    resolucion: {
        height:{ 
            type:Number,
            required: true,
            trim: true,
        },
        width:{ 
            type:Number,
            required: true,
            trim: true,
        },
    },
    location: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
        },
    },
    listas: [{type:Schema.Types.ObjectId,
        autopopulate: true,
            //  validate: [function(lista:string){
            //     // console.log(lista)                
            //    //  console.log(pantallaSchema.path('nombre'));
            //     return false;//false es que no pasa la validacion
            //  },"La lista ya existe en la pantalla"],
             ref:"lista"}]
},{
    versionKey:false,
    timestamps:true,
    
})


// pantallaSchema.path("listas").validate( (listas:any)=>{
//     // const ctx = (this as any).getUpdate().$set.nombre
//     // console.log(ctx, 'este es el ctx')
//     console.log('Pasamos por aqui');
//     return false;
// },'Mensaje de validacion')
// pantallaSchema.pre('update', function() {
// })
pantallaSchema.plugin(require('mongoose-autopopulate'));

export default model('pantalla', pantallaSchema);