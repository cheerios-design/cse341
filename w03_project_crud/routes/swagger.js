const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const customHtml = (req) => {
  const loginSuccess = req.query.login === 'success';
  const userName = req.session && req.session.user ? req.session.user.displayName || req.session.user.username : null;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation</title>
      <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
      <style>
        .login-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #49cc90;
          color: white;
          padding: 15px 25px;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 9999;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .login-popup.fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: translateX(400px);
          }
        }
      </style>
    </head>
    <body>
      ${loginSuccess && userName ? `
        <div class="login-popup" id="loginPopup">
          ✓ Successfully logged in as ${userName}!
        </div>
        <script>
          setTimeout(() => {
            const popup = document.getElementById('loginPopup');
            popup.classList.add('fade-out');
            setTimeout(() => popup.remove(), 500);
          }, 3000);
        </script>
      ` : ''}
      <div id="swagger-ui"></div>
      <script src="./swagger-ui-bundle.js"></script>
      <script src="./swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function() {
          window.ui = SwaggerUIBundle({
            url: './swagger.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
          });
        };
      </script>
    </body>
    </html>
  `;
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res) => {
  res.send(customHtml(req));
});

module.exports = router;
