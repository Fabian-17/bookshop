import { Schema, model } from 'mongoose';

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    bibiliography: {
        type: String,
        required: true
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    },
},
    { 
        timestamps: true,
        versionKey: false 
    },
);

export const Author = model('Author', AuthorSchema)