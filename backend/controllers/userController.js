import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// desc@     authenticate User
//route      GET /api/
//access     Public

const getUser = asyncHandler( async(req, res) => {
   const {email,password}=req.body
  
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
      res.json({
         _id: user._id,
         email: user.email,
         name: user.name,
         isAdmin: user.isAdmin,
         
         token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or password")
    }
})

const registerUser = asyncHandler( async(req, res) => {
  const {name,email,password}=req.body
 
   const userExists = await User.findOne({email})

   if (userExists){
    res.status(401)
    throw new Error("User already exists")
   }

   const user = await User.create({
    name,
    email,
    password
   })

   if(user){
    res.status(201).json({
      _id: user._id,
         email: user.email,
         name: user.name,
         isAdmin: user.isAdmin,
         
         token: generateToken(user._id)
    })
   } else {
    res.status(404)
    throw new Error("Invalid user registration")
   }
})

   
    // desc@     Get User Profile
    //route      GET /api/users/profile
    //access     Private

const getProfile = asyncHandler( async(req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
   res.json({_id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin
  }) 
  } else {
    res.send(404)
    throw new Error('User not found')
  }
  

})

  // desc@     Update User Profile
    //route      Put /api/users/profile
    //access     Private

    const updateProfile = asyncHandler( async(req, res) => {
      const user = await User.findById(req.user._id)

      if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
          user.password = req.body.password
        
        }
      }

      const updatedUser = await user.save()
    
      if(user){
       res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin
      }) 
      } else {
        res.send(404)
        throw new Error('User not found')
      }
      
    
    })

    // desc@     Get User Profile
    //route      GET /api/users/profile
    //access     Private add admin

const getAdmin = asyncHandler( async(req, res) => {
  const user = await User.find({})

 res.json(user)
  

})


    // desc@     Get User Profile
    //route      GET /api/users/profile
    //access     Private add admin

    const deleteUser = asyncHandler( async(req, res) => {
      const user = await User.findById(req.params.id)
    
     if(user){
      await user.deleteOne()
      res.json({message: 'User Removed'})
     } else {
      throw new Error('User not found')
     }
      
    
    })

    // desc@     Get User Profile
    //route      GET /api/users/:id
    //access     Private add admin

const getUserById = asyncHandler( async(req, res) => {
  const user = await User.findById(req.params.id).select('-password')
if (user) {
  res.json(user)
} else {
  throw new Error('User not found')
}

  

})

    // desc@     Update User Profile
    //route      Put /api/users/:id
    //access     Private/Admin

    const updateUserById = asyncHandler( async(req, res) => {
      const user = await User.findById(req.params.id)

      if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin
      }

      const updatedUser = await user.save()
    
      if(user){
       res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin
      }) 
      } else {
        res.send(404)
        throw new Error('User not found')
      }
      
    
    })
    
       


export  {getUser,getProfile,registerUser,updateProfile,getAdmin,deleteUser, getUserById,updateUserById}
