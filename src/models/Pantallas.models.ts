import { Schema, model, Document } from 'mongoose';

export interface IPantalla extends Document {
    nombre: string;
    descripcion?: string;
    marca?: string;
    modelo?: string;
    orientacion?: string;
    resolucion: 
    {
        height: number;
        width: number;
    };
    location?: 
    {
        type: string;
        coordinates:number[];
    };
    listas?: any[];
}

const pantallaSchema = new Schema <IPantalla> ({
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
    listas: [{
        type:Schema.Types.ObjectId,
        ref:"lista",
        autopopulate: true
    }]
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

export default model <IPantalla> ('pantalla', pantallaSchema);