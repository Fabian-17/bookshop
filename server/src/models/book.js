import { Schema, model } from "mongoose";

export const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    gender: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    year_publication: {
        type: Number,
        required: true
    },
    front_page: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },

},
{ 
    timestamps: true,
    versionKey: false 
},
);


export const Book = model('Book', BookSchema)