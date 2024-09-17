const bcrypt = require('bcrypt');  //for pwd hashing
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); //import the User model

const jwtExpireTime = 24 * 60 * 60 ;

exports.registerUser =  (req,res)=>{ 
    
    // const {name, email, password} = req.body;
    //const hashedPassword = bcrypt.hash(password,await bcrypt.genSalt(10));
    //console.log(req.body.name);
    User.findOne({
        email: req.body.email,
    }).then((user)=>{
        if(user){
            return res.status(400).json({email:"email exists"})
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
            //hence the password need to be encrypted
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                console.log('ther is an error', err);
            }else{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err){
                        console.log('there is an error hash',err);
                    }else{
                        newUser.password = hash;
                        newUser.save().then((user)=>{
                            console.log('registered successfully');
                            return res.json(user);
                        })
                    }
                })
            }
        })
        }

        
        
    })
 }

 exports.loginUser = (req, res) => {
   console.log('welcome to loginUser');
   const email = req.body.email;
   const password = req.body.password;
 
   User.findOne({ email }).then((user) => {
     if (!user) {
       res.status(404).json({ message: 'user not found' });
     } else {
       bcrypt.compare(password, user.password).then((isMatch) => {
         if (isMatch) {
           const payload = {
             id: user.id,
             name : user.name,
             role: user.role
           };
 
           jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: jwtExpireTime }, (err, token) => {
             if (err) {
               console.log('there is an error in jwt', err);
             } else {
               console.log('login successful', payload);
               res.json({ success: true, token: `Bearer ${token}` });
             }
           });
         } else {
           res.status(401).json({ message: 'Invalid password' });
         }
       });
     }
   });
 };
 
 
 



// exports.loginUser = (req,res)=>{
//     console.log('welcome to loginUser');
//     const email = req.body.email;
//     const password = req.body.password;
//     User.findOne({email}).then((user)=>{
//         if(!user){
//             res.status(404).json({message:'user not found'});
//         }
//         bcrypt.compare(password, user.password).then((isMatch)=>{
//             if(isMatch){
//                 const payload = {
//                     id: user.id,
//                     name: user.name,
//                    // role: user.role
//                 };
//                 //console.log(user.password)
//                 jwt.sign(payload,
//                          process.env.SECRET_KEY, 
//                          {expiresIn : jwtExpireTime}),
//                          (err,token)=>{
//                            console.log(token)
//                             if(err){
//                                 console.log('there is an error in jwt', err);
//                             }else{
//                                 console.log('login successfull',payload);
//                                 res.json({
//                                     success : true,
//                                     token : `bearer: ${token}`
//                                 })
//                             }

//                          }            }
//         })

//     })

//     }
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ email: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
//     const newUser = new User({ name, email, password: hashedPassword, role });

//     await newUser.save();
//     console.log("Registered successfully");
//     return res.json(newUser);
//   } catch (error) {
//     console.error(error);
//     console.log (error);
//     return res.status(500).json({ message: "Error registering user",err: "error" });
//   }
// };
