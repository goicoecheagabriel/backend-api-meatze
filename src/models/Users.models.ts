import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document{
    userName:string;
    email:string;
    password:string;
    tipo:string;
    comparePassword:(password:string,passwordDB:string) => Promise<boolean>; 
}

const userSchema = new Schema <IUser> ({
    _id: Schema.Types.ObjectId,
    userName:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    tipo:{
        type: String,
        enum:['ADMIN','USER'],
        required: true,
        default: "USER",
}
},{
    versionKey:false,
    timestamps:true,
    toJSON:{
        transform(doc,ret){
        //   ret.id = ret._id;
        //   delete ret._id;
          delete ret.password; // funciona perfectamente
          //delete ret.__v; // versionKey:false también hace lo mismo
        }
      }
})

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    
})

userSchema.methods.comparePassword = async(password:string, passwordDB:string) => {
    return  await bcrypt.compare(password,passwordDB);
}

export default model <IUser> ('user', userSchema);