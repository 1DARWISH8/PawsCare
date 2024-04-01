// import jwt module
const jwt = require('jsonwebtoken')

// function to verify token generated and stored
function verifytoken(req,res,next)
{
    // token verification logic
        // get bearer token from headers of req object
        const bearertoken = req.headers.authorization;
        // get token if it's available
        if(bearertoken)
        {
            // when token is available
            const Token = bearertoken.split(' ')[1];
            try
            {
                // verify token
                let decodedToken = jwt.verify(Token,process.env.SECRET_KEY)
                // attach decoded token to request object
                req.user = decodedToken
                console.log(req.user)
                next()
            }
            catch(err)
            {
                res.status(403).send({message:"Invalid token"})
            }
        }
        // when token is not provided
        else
        {
            res.status(403).send({message:"User unauthorised, token is not provided"})
        }
}

module.exports=verifytoken
