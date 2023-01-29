const express=require("express")
const mongoose=require("mongoose")
const cors=require('cors')
const cards=require("./cards");
const e = require("express");







const app = express()
const port = process.env.PORT || 8000;


//middleware
app.use(express.json());
app.use(cors())




const connection_url="mongodb+srv://rbariyal64:Rahul786@cluster0.onn0t.mongodb.net/Cluster0?retryWrites=true&w=majority";


mongoose.connect(connection_url,
  {
    useNewUrLParser:true,
    useUnifiedTopology:true,
  })

app.get("/",function(req,res)
{

  res.send("Hello world")
   
})

//addcard
  app.post("/cards/add",(req,res)=>
{
    const cardDetail=req.body;
  console.log(cardDetail);

  cards.create(cardDetail,(err,data)=>
  {
    if(err)
    {
      res.status(500).send(err.message);
    }
    else
    {
      res.status(201).send(data);
    }
  })
})

app.get("/cards/get",(req,res)=>
{
  cards.find((err,data) =>
  {
if(err)
{
  res.status(500).send(err)
}
else
{
  res.status(200).send(data)
}
  });
})

app.delete("/cards/delete/:id",(req,res)=>
{
  cards.findByIdAndRemove(req.params.id,(err,data)=>
  {
    if(err)
    {
    res.status(500).send(err)
    console.log(err);
    }
    else
    {
      res.status(200).send(data)
    }
  })
})

app.put("/cards/update/:id",(req,res)=>
{
  const id=req.params.id;
const newCardDetails=req.body;
const newcardholder=newCardDetails.cardHolder;
const newexpiry=newCardDetails.expiry;
console.log(newcardholder);
console.log(newexpiry);
console.log(id);

 cards.findByIdAndUpdate(id,{
  $set:
        {
          cardHolder:newcardholder,
          expiry:newexpiry,
        }
 },(err,data)=>
 {
 if(err)
 {
  res.status(500).send(err)
  console.log(err);
 }
 else
 {
  res.status(200).send(data)
 }}
 )
}

)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))