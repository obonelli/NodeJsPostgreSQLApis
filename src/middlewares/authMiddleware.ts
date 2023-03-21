import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  // Aquí deberías verificar el token, decodificarlo y validar su firma.
  // En este ejemplo, simplemente comprobamos si el token coincide con un valor fijo.
  const expectedToken = 'tu_token_secreto';
  if (token !== expectedToken) {
    return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
  }

  // Si el token es válido, llamamos a next() para continuar con el controlador.
  next();
};

export default authMiddleware;
