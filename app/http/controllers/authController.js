const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController()
{

        return {
            login(req,res){
                res.render("auth/login")
            },
            postLogin(req,res,next)
            {
                const {email , password } = req.body;

                //valideate request
                if(!email || !password)
                {
                    req.flash('error','all fields are required')
            
                    return res.redirect('/login');
                }


                    passport.authenticate('local',(err,user,info)=>{

                        if(err)
                        {
                            req.flash('error',info.message)
                            return next(err)
                        }
                        if(!user)
                        {
                            req.flash('error',info.message)
                            return res.redirect('/login')
                        }
                        req.logIn(user,(err) =>{
                            if(err){
                                req.flash('error',info.message)
                                return next(err)
                            }
                            return res.redirect('/');
                        })
                    })(req , res, next )
            },
            register(req,res){
                res.render("auth/register");
            },
            async postRegister(req,res){
                const { name , email , password } = req.body
                // console.log(req.body);
                //validate req
                if(!name || !email || !password)
                {
                    req.flash('error','all fields are required')
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register');
                }


                //check email
                User.exists({email: email} ,(err , result)=> {
                    if(result)
                    {
                        req.flash('error','Email already regisrted')
                        req.flash('name',name)
                        req.flash('email',email)    
                    }
                })

                //hash password

                const hashedpassword = await bcrypt.hash(password,10)

                //create a user
                const user = new User({
                    name: name,
                    email:email,
                    password: hashedpassword

                })

                user.save().then((user)=>
                {
                    //login
                    return res.redirect('/')

                }).catch(err =>{
                    // req.flash('error','something went wrong')
                    return res.redirect('/register')
                })
                
            },
            logout(req,res)
            {
                req.logout()
                return res.redirect('/login')
            }
        }
}

module.exports = authController;