import jwt from 'jsonwebtoken'

const KEY = 'TccFrei@2025'

export function generateToken(userInfo) {
  if (!userInfo.role)
    userInfo.role = 'user';

  return jwt.sign(userInfo, KEY)
}

export function getTokenInfo(req) {
  try {
    let token = req.headers['x-access-token'];

    if (token === undefined)
      token = req.query['x-access-token']

    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    return null;
  }
}

export function getAuthentication(throw401 = true) {  
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
  
      if (token === undefined)
        token = req.query['x-access-token'];
    
      if (!token) {
        if (throw401) {
          return resp.status(401).json({ erro: 'Token de autenticação não fornecido.' });
        }
        return next();
      }
    
      let signd = jwt.verify(token, KEY);
      req.user = signd;
      next();
    }
    catch (err) {
      if (throw401) {
        return resp.status(401).json({ erro: 'Token inválido ou expirado.' });
      }
      next();
    }
  }
}

// Middleware de autorização por role
export function requireRole(...allowedRoles) {
  return (req, resp, next) => {
    if (!req.user) {
      return resp.status(401).json({ erro: 'Autenticação necessária.' });
    }

    const userRole = req.user.role;
    
    if (!allowedRoles.includes(userRole)) {
      return resp.status(403).json({ 
        erro: `Acesso negado. Apenas usuários com role: ${allowedRoles.join(', ')} podem acessar este recurso.` 
      });
    }

    next();
  }
}