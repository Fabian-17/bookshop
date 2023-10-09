import { Schema, model } from "mongoose";

export const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
},
{ 
    timestamps: true,
    versionKey: false 
},
);

export const Genre = model('Genre', GenreSchema)