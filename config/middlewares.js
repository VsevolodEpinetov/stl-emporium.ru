module.exports = ({ env }) => [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  { resolve: './src/middlewares/admin-redirect' },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'https://localhost:3000', "https://stl-emporium.ru", "https://api.stl-emporium.ru"],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
];
