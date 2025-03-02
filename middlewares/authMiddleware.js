

const { auth } = require("../config/firebaseAdmin"); 

const checkAuth = (req, res, next) => {
    const idTokenCookie = req.cookies.token

    if(!idTokenCookie) {
        return res.redirect('/login')
    }

   
    auth.verifyIdToken(idTokenCookie)
    .then((decodedToken) => {
        req.user = decodedToken
        next()
    })
    .catch((error) => {
        console.log(`Error al verificar el token de las cookies: ${error}`);
    })
}

module.exports = checkAuth