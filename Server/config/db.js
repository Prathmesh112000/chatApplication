const mongoose=require("mongoose")




const database = async () => {
    try {

    await mongoose.connect('mongodb+srv://nerleprathmeshanil:CyyjRlIPZbRvBfxL@cluster0.nklllls.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
    console.log("mongodb connected");
    
} catch (error) {
    console.log("error",error);
}
    
}
module.exports=database