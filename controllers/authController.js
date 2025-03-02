require('dotenv').config();
const admin=require('firebase-admin');
const auth =admin.auth();
const path = require('path');


const authController = {
    async showLogin(req, res) {
       try {
        res.sendFile(path.join(__dirname, "../public/views/login.html"));
        
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: "There was a problem trying to create a product" });
        }
    
    },

 
 async verifyToken (req, res) {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ success: false, message: "Token no recibido" });
    }

    try {
        await auth.verifyIdToken(idToken);
        res.cookie(process.env.SECRET_WORD, idToken,
             { httpOnly: true, secure: false,sameSite: "Lax" });

        res.json({ success: true });
    } catch (error) {
        console.log(`Error al verificar el usuario: ${error}`);
        res.status(401).json({ success: false, message: "Token inválido" });
    }
          },

    //PUT /dashboard/:productId: Actualiza un producto.
 async logout (req, res) {
   
    res.clearCookie('token')
    res.redirect('/login')
},

//delete 
async showRegister(req,res){
    try {
        res.sendFile(path.join(__dirname, "../public/views/register.html"));
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
},

  async verifyUser (req, res)  {
   
    const { email, password } = req.body;
    try {
        await auth.createUser({
            email,
            password
        })

        res.redirect('/login')
    } catch (error) {
        console.error(`error interno de registro: ${error}`);
        res.redirect('/register')
    }
     }
  
}

module.exports=authController;