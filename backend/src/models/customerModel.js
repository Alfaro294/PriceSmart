/* Campos:
    name
    lastName
    email
    password
    birthday
    isVerified
    loginAttemps
    timeOut
*/
import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
    name : {
        type : String
    },
    lastName : {
        type : String
    },
    birthday : {
        type : Date
    },
    email : {
        type : String
    },
    password : {
        type: String
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

export default model ("Customers", CustomerSchema)