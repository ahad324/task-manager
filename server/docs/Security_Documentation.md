# Security Documentation

## Authentication Flow

1. **Registration**: User submits `username`, `email`, and `password` to `/api/auth/register`.
   - Data validated with Joi, hashed with bcrypt, stored in MongoDB.
   - JWT token generated and returned.
2. **Login**: User submits `email` and `password` to `/api/auth/login`.
   - Password compared with hashed value using `matchPassword`.
   - JWT token generated and returned.
3. **Logout**: Client removes token; server logs out via `/api/auth/logout`.
4. **Token Verification**: `/api/auth/verify` checks JWT validity using `protect` middleware.

## Security Measures

- **JWT**: Signed with `JWT_SECRET`, expires in 30 days.
- **Middleware**: `authMiddleware.js` validates Bearer tokens.
- **CORS**: Configured with `cors` middleware.
- **Helmet**: Adds HTTP security headers.
- **Input Validation**: Joi ensures data integrity.

## Vulnerabilities

- Ensure `JWT_SECRET` is strong and unique.
- Avoid exposing stack traces in production (handled by `errorHandler.js`).
