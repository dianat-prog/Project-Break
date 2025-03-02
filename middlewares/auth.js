/*function isAuthenticated(req, res) {
    const idTokenCookie = req.cookies.token
    if (!idTokenCookie) {
        return false;  
    } else {
        
        return true;  
    }
}*/
function isAuthenticated(req) {
    return !!req.cookies.token;  
}

module.exports = isAuthenticated;