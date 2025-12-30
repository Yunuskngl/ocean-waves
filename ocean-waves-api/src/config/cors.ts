import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigins = [
  process.env.FRONTEND_URL!,
  process.env.ADMIN_PANEL_URL!,
];

export default function GetCorsConfiguration(): CorsOptions {
  return {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Accept-Encoding',
      'Accept-Language',
      'X-Requested-With',
      'Origin',
      'Referer',
      'Connection',
      'Host',
      'User-Agent',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'Sec-CH-UA',
      'Sec-CH-UA-Mobile',
      'Sec-CH-UA-Platform',
      'Sec-Fetch-Dest',
      'Sec-Fetch-Mode',
      'Sec-Fetch-Site',
    ],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 204,
  };
}