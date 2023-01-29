const mongoose=require('mongoose')


const CardSchema=mongoose.Schema(
    {
        card:String,
cardHolder:String,
        expiry:String,
    }
)

module.exports=mongoose.model('cards',CardSchema);