/* Campos:
    name
    email
    password
    birthday
    status
    isVerified
    loginAttemps
    timeOut
*/
import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type: String
    },
    birthday : {
        type : Date
    },
    status : {
        type : Boolean
    },
    isVerified : {
        type : Boolean
    },
    loginAttemps : {
        type : Number
    },
    timeOut : {
        type : Date
    }
},
{
    timestamps : true,
    strict : false
}
)

export default model ("Clients", brandsSchema)