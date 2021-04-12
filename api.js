const express = require("express");
const { check, validationResult } = require("express-validator");
const msgError =
  "limit exceeded quotas cannot be greater than 36 and credit value must not be greater than 10'000000";
function calculator(interes, n, capital) {
  if (capital && n && capital <= 0) {
    return null;
  } else {
    capital = Math.round(capital);
    var i = interes / 1200;
    var cuota = Math.round(capital / ((1 - Math.pow(i + 1, -n)) / i));
    return cuota;
  }
}

function api(app) {
  const router = express.Router();
  app.use("/api", router);

  router.post(
    "/credit",
    [
      check("total", "Please provide an email").exists().isInt(),
      check("cuotas", "Please provide the password").exists().isInt(),
    ],
    function (req, res) {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { total, cuotas } = req.body;
        if (total > 10000000 || cuotas > 36) {
          throw msgError;
        }
        var cuota = calculator(2, cuotas, total);
        if (cuota) {
          res.status(200).json({
            pay: cuota,
            message: "successful account",
          });
        } else {
          throw "Invalid Values";
        }
      } catch (error) {
        res.status(500).json({
          pay: null,
          message: "unsuccessful account " + error,
        });
      }
    }
  );
}

module.exports = api;
