import { Schema, model, Document } from 'mongoose';

export interface IMultimedia extends Document {
    tipo: string;
    url: string;
    resolucion?: 
    {
        height: number;
        width: number;
    };
    relacionAspecto?:string;
    duracion?:string | number;
    titulo:string;
    descripcion?:string;
}
//mirar si el generico ayuda en el Schema al hacer Users
const multimediaSchema = new Schema <IMultimedia> ({
    _id:Schema.Types.ObjectId,
    tipo: {
        type: String,
        enum: ['IMG','VIDEO','HTML'],
        required: true,
        trim: true,
    },
    url:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    resolucion:{
        height:{
            type: Number,
            trim: true
        },
        width:{
            type: Number,
            trim: true
        }
    },
    relacionAspecto:{
        type:String,
        trim:true
    },
    duracion: {
        type:String || Number,
        trim:true
    },
    titulo: {
        type:String,
        trim:true,
        required: true,
    },
    descripcion: {
        type:String,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
})

export default model <IMultimedia> ('multimedia',multimediaSchema)

