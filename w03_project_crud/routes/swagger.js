const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
  const loginSuccess = req.query.login === 'success';
  const userName = req.session && req.session.user ? req.session.user.displayName || req.session.user.username : null;
  
  if (loginSuccess && userName) {
    // Inject custom HTML with success popup
    const customHtml = swaggerUi.generateHTML(swaggerDocument);
    const modifiedHtml = customHtml.replace(
      '</head>',
      `<style>
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
      </style></head>`
    ).replace(
      '<body>',
      `<body>
        <div class="login-popup" id="loginPopup">
          ✓ Successfully logged in as ${userName}!
        </div>
        <script>
          setTimeout(() => {
            const popup = document.getElementById('loginPopup');
            if (popup) {
              popup.classList.add('fade-out');
              setTimeout(() => popup.remove(), 500);
            }
          }, 3000);
        </script>`
    );
    res.send(modifiedHtml);
  } else {
    // Regular swagger UI
    swaggerUi.setup(swaggerDocument)(req, res, next);
  }
});

module.exports = router;
