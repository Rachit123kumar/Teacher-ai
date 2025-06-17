import mongoose from "mongoose"
const chats=new  mongoose.Schema({
    pdfName:{
        type:String,
        required:true
    },
    pdfUrl:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    fileKey:{
        type:String,
        required:true
    }
    
})


const messages=new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chats',
        required:true
    
        
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:['system','user'],
        required:true
    }
})


export const Chats=mongoose.models.Chats || mongoose.model('Chats',chats)
export const Messages=mongoose.models.Messages || mongoose.model('Messages',messages)