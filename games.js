var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer');

/* GET home page. */
router.post('/addnewgames',upload.any(), function(req, res, next) {

    pool.query("insert into games(categoryid,subcategoryid,gamename,description,price,picture,stock,rented,rentamt,offer)values(?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.gamename,req.body.description,req.body.price,req.files[0].originalname,req.body.stock,req.body.rented,req.body.rentamt,req.body.offer],function(error,result){
     if(error)
     { console.log(error)
       res.status(500).json({result:false})
     }
     else
     {
       console.log(error)
       res.status(200).json({result:true})
     }

    })

  
});

router.get('/displayallgames',function (req,res){
pool.query("select * from games",function(error,result){

  if(error){
  
  res.status(500).json([])
  }
  else {
    res.status(200).json(result)

  }
})

})

router.get('/displayallgames',function (req,res){

  pool.query("select * from games",function(error,result){

    if(error){
  
      res.status(500).json([])
      }
      else {
        res.status(200).json(result)
    
      }
   })
})


 router.post('/editpicture',upload.single('picture'), function(req, res, next) {
 
  pool.query("update games set picture=? where gameid=?",[req.file.originalname,req.body.gameid],function(error,result){
   if(error)
   { console.log(error)
     res.status(500).json({result:false})
   }
   else
   {
     console.log(error)
     res.status(200).json({result:true})
   }


  })

}); 

router.post('/editgamesdata', function(req, res, next) {
 
  pool.query("update games set categoryid=?subcategoryid=?gamename=?description=?price=?picture=?stock=?rented=?rentamt=? where gameid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.gamename,req.body.description,req.body.price,req.files[0].originalname,req.body.stock,req.body.rented,req.body.rentamt],function(error,result){
    if(error)
    { console.log(error)
      res.status(500).json({result:false})
    }
    else
    {
      console.log(error)
      res.status(200).json({result:true})
    }

   })

});

router.post('/deletegames' , function(req, res, next) {

  pool.query("delete from games  where gameid=?",[req.body.gameid],function(error,result){
   if(error)
   { console.log(error)
     res.status(500).json({result:false})
   }
   else
   {
     console.log(error)
     res.status(200).json({result:true})
     }
    }
   );
 })

 router.get('/gamesoffers',function (req,res){

  pool.query("select * from games where offer>0",function(error,result){

    if(error){
  
      res.status(500).json([])
      }
      else {
        res.status(200).json(result)
    
      }
   })
})

module.exports = router;