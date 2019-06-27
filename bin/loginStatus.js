const getLoginStatus = (req)=>req.session.currentUser ? true : false; 



module.exports=getLoginStatus()