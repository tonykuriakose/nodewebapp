



const getForgotPassPage= async (req,res)=>{
    try {

        res.render("forgot-password");
        
    } catch (error) {
        res.redirect("/pageNotFound");
        
    }
}

module.exports = {
    getForgotPassPage,
}