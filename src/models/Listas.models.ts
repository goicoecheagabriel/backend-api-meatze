import { Schema, model, Document } from 'mongoose';

export interface ILista extends Document {
    nombre: string;
    descripcion: string;
    multimedias:[];
}
const listaSchema = new Schema <ILista> ({
    _id: Schema.Types.ObjectId,
    nombre:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    descripcion:{
        type:String,
        trim:true,
        required: true,
        unique: true,
    },
    multimedias:[{
        type:Schema.Types.ObjectId,
        ref:"multimedia",
        autopopulate: true,
    }]

},{
    timestamps:true,
    versionKey:false,
})

listaSchema.plugin(require('mongoose-autopopulate'));

export default model <ILista> ('lista',listaSchema);