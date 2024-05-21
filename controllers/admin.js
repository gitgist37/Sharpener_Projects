const { where } = require('sequelize');
const User = require('../models/user');
const path = require('path');


exports.loadUserPage = (req,res,next)=>
{
    //res.sendFile(path.join(rootDir, '/public/booking_login.html'));
    res.sendFile(path.join(__dirname, '..', 'public', 'booking_login.html'));
};


exports.getCustomers = (req,res,next)=>
{
    console.log("Present in the get API section");
    User.findAll()
    .then(result=> 
    {
    console.log(result);
    res.json(result);
    })
    .catch(err => console.log(err));
}

exports.postAddCustomer = (req, res, next) => 
{
  console.log("Into the post customer API");
  const Cust_Name = req.body.name;
  const Cust_Email = req.body.email;
  const Cust_Contact = req.body.contact;
  //console.log(Cust_Name,Cust_Email,Cust_Contact,"323")
  User.create({name: Cust_Name, email: Cust_Email, contact: Cust_Contact})
  .then(result=>
  {
    console.log(res);
    console.log(result);
    res.json(result);
  })
  .catch(err=>console.log(err));
  
};

exports.deleteCustomer = (req,res,next)=>
{
  console.log("Into delete api");
  let deleteId = req.params.id;
    User.findAll({ where: { id: deleteId } })
    .then(user => 
      {
            return User.destroy({ where: { id: deleteId } });
      })
    .then(result => console.log('deleted from db'))
    .catch(err=>console.log(err));
};

exports.modifyCustomer = async (req,res)=>
{
  try {
    console.log("Into editing api", req.body);
    let editId = req.body.id;
    let user = await User.findAll({ where: { id: editId } })
    if(!user) 
      {
      return res.status(401).json({
        success: false,
        message: `No user found with ${req.body.id}`
      });
    }

    let modifydata = await User.update({
      name: req.body.name, 
      email: req.body.email, 
      contact:req.body.contact },
    {where: {
      id: editId
    }}
    );

    if(modifydata) {
      let updated_user = await User.findAll({ where: { id: editId } });
      if(!updated_user) {
        return res.status(401).json({
          success: false,
          message: `No user found with ${req.body.id}`
        });
      }
      res.status(200).json({
        success:true,
        updated_user: updated_user
      });
    }
    else {
      return res.status(401).json({
        success: false,
        message: `problem with modifydata`
      });
    }

  }
  catch(err) {
    return res.status(500).json({
      success: false,
      message: `Some problems`,
      error:err.message
    });
  }
}


exports.getSingleCust = async (req,res)=>
  {
    try {
      console.log("Into editing api", req.query);
      let editId = req.query.id;
      let user = await User.findAll({ where: { id: editId } })
      if(!user) 
        {
        return res.status(401).json({
          success: false,
          message: `No user found with ${req.body.id}`
        });
      }
      else
      {
        return res.status(200).json({
          success: true,
          message: `data from backend `,
          user:user
        });
      }
  
    }
    catch(err) {
      return res.status(500).json({
        success: false,
        message: `Some problems`,
        error:err.message
      });
    }
  }