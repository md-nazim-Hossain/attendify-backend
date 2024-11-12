import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const config = {
  port: process.env.PORT || 3000,
  db: {
    db_url: process.env.DATABASE_URL,
    db_name: process.env.DB_NAME,
    limit: '4mb',
  },
  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    access_token_expiry: '3d',
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_expiry: '365d',
    reset_password_token_secret: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET,
    reset_password_token_expiry: '1h',
  },
  bcrypt: {
    salt: process.env.BCRYPT_SALT || 10,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
