import {Schema, model} from 'mongoose';

const listaSchema = new Schema({
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

export default model('lista',listaSchema);