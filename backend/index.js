require("dotenv").config();
const express = require("express");
const sequelize = require("./app/sequelize");
const router = require("./app/router");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

(async function () {
  try {
    console.log("Try to connect the database.\nPlease wait...");
    await sequelize.authenticate();
    console.log("Connection has been established successfully:", sequelize.options.host);

    // ----------- MIDDLEWARE : LOG toutes les requêtes -----------
    app.use((req, res, next) => {
      console.log(`➡️  [${new Date().toISOString()}] ${req.method} ${req.url}`);
      if (Object.keys(req.body || {}).length) {
        console.log("   Body:", JSON.stringify(req.body));
      }
      next();
    });

    // ----------- MIDDLEWARE : Mesure de performance (par route) -----------
    app.use((req, res, next) => {
      const start = performance.now();
      res.on("finish", () => {
        const duration = (performance.now() - start).toFixed(2);
        console.log(`⏱️  ${req.method} ${req.url} - ${duration} ms - Status ${res.statusCode}`);
      });
      next();
    });

    // ----------- Body parser + CORS -----------
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      next();
    });

    // ----------- ROUTES -----------
    app.use(router);

    // ----------- MIDDLEWARE GLOBAL : Gestion des erreurs -----------
    app.use((err, req, res, next) => {
      console.error("❌ Unhandled error:", err);

      const response = {
        error: true,
        message: "Une erreur interne est survenue.",
      };

      // Montrer les détails seulement en DEV
      if (process.env.NODE_ENV === "development") {
        response.details = err.message;
        response.stack = err.stack;
      }

      // Toujours renvoyer une réponse pour éviter le loader infini
      return res.status(200).json(response);
    });

    // ----------- SERVER -----------
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Listening on http://0.0.0.0:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "production"}`);
    });

  } catch (error) {
    console.error("Unable to connect to the database.\n", error);
  }
})();