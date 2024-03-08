import mongoose, {Schema} from "mongoose";

const bookSchema = mongoose.Schema({
    name:{
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        uppercase: true, 
        enum: ['BORROWED', 'AVAILABLE'],
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
},{
    versionKey: false
})

export default mongoose.model('book', bookSchema)