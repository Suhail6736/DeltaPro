const User = require("../models/user")


module.exports.randersignupform = (req,res)=>{
    res.render("users/signup.ejs")
}



module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerUSer = await User.register(newUser,password);
        console.log(registerUSer);
        req.login(registerUSer,(err)=>{
            if(err){
                return next()
            }
            req.flash("success","welcome to wonderlust");
            res.redirect("/listings")
        });
      
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
   
}

module.exports.loginranderform = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}