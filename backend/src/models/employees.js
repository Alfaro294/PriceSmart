/*Campos
 name
 lastName
 salary
 DUI
 phone
 email
 password
 idBranches
*/

import mongoose, {Schema, model} from "mongoose"; 

const employeesSchema = new Schema ({
    name : {
        type : String
    },
    lastName : {
        type : String
    },
    Salary : {
        type : Number
    },
    DUI : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    idBranches : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Branches"
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
})
export default model ("Employee", employeesSchema)
