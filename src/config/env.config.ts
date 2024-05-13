export const MODE_APP: any = 'dev';
const MODE_APP_DEFINED = (Developpement:any, Production:any) => {
   return MODE_APP === 'dev' ? Developpement : Production
}

export const env = {
   SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN,
   SECRET_KEY_MAIL: process.env.SECRET_KEY_MAIL,

   HOST_CLIENT: MODE_APP_DEFINED('http://localhost:5173', 'https://jci.com'),
   HOST_SERVER: MODE_APP_DEFINED('http://localhost:8080/api/', 'https://api.jci.ci/api'),
   HOST_PROVIDERS: MODE_APP_DEFINED('http://localhost:8080/i-providers', 'https://api.jci.ci/i-providers'),
   HOST_CLIENT_IMAGE: MODE_APP_DEFINED('http://localhost:8080/i-images/storage', 'https://api.jci.ci/i-images/storage'),
   PORT: MODE_APP_DEFINED(process.env.PORT_LOCAL, process.env.PORT),


   // Database 
   DB_HOST: MODE_APP_DEFINED('localhost', process.env.DB_HOST),
   DB_USERNAME: MODE_APP_DEFINED('root', process.env.DB_USERNAME),
   DB_PASSWORD: MODE_APP_DEFINED('', process.env.DB_PASSWORD),
   DB_DATABASE: MODE_APP_DEFINED('db02_jci', process.env.DB_DATABASE),
   DB_CHARSET: MODE_APP_DEFINED('utf8mb4_bin',process.env.DB_CHARSET ),
   DB_PORT: MODE_APP_DEFINED('3306', process.env.DB_PORT),

   // Mail
   MAIL_POOL: MODE_APP_DEFINED(true, true),
   MAIL_PORT: MODE_APP_DEFINED(2525, process.env.MAIL_PORT),
   MAIL_HOST: MODE_APP_DEFINED("sandbox.smtp.mailtrap.io", process.env.MAIL_HOST),
   MAIL_USERNAME: MODE_APP_DEFINED('ee61912deb58d4', process.env.MAIL_USER),
   MAIL_PASSWORD: MODE_APP_DEFINED('7e8fb7df4629a0', process.env.MAIL_PASS)
};



