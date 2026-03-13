/*
    Campos:
        name
        address
        Schedule
        isActive
*/

import {Schema, model} from "mongoose";

const branchesSchema = new Schema({
    name :{
        type : String
    },
    address : {
        type : String
    },
    schedule : {
        type : Date
    },
    isActive : {
        type : Boolean
    }
},{
    timestamps : true,
    strict : false
}
)

export default model ("Branches", branchesSchema)