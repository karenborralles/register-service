require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Falta token");

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Token inválido");
  }
}

app.post('/registro', authMiddleware, (req, res) => {
  // Aquí podrías guardar en la DB. Por ahora, simulamos:
  res.json({
    message: "Registro exitoso",
    usuario: req.user
  });
});

app.get('/', (req, res) => {
  res.send('Register-service funcionando correctamente 🚀');
});


app.listen(process.env.PORT, () => {
  console.log(`Register-service corriendo en puerto ${process.env.PORT}`);
});
