
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyBK66s3BIU0kIxa3vIOIC4MonWaadE9bnU",
    authDomain: "fir-auth-9954d.firebaseapp.com",
    projectId: "fir-auth-9954d",
    storageBucket: "fir-auth-9954d.firebasestorage.app",
    messagingSenderId: "150552620863",
    appId: "1:150552620863:web:1424b34cb17e27db41ed8a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Iniciar sesión en Firebase con email y password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // OBTENER EL TOKEN DE AUTENTICACIÓN
        const idToken = await user.getIdToken();
              // Enviar el token al backend en lugar de email y password
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken })
        });
        
        const data = await response.json();
        if (data.success) {
            console.log('ENTRA --')
            window.location.href = "/dashboard"; // Redirigir si el login es exitoso
        } else {
            console.error("Error en login:", data.message);
        }

    } catch (error) {
        console.log(`No se ha podido hacer el login de usuario ${error}`);
    }
};


document.getElementById('loginForm').addEventListener('submit', login);