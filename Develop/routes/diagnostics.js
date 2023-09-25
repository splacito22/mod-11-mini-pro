const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// constants
const FILE_NAME = "./db/diagnostics.json";
// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  readFromFile(FILE_NAME).then((data) => {
    res.json(JSON.parse(data));
  });
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  console.log(req.body);

  const { isValid, errors } = req.body;

  const payload = {
    time: Date.now(),
    error_id: uuidv4(),
    errors,
  };

  if (!isValid) {
    readAndAppend(payload, FILE_NAME);
    res.json(`Diagnostic information added 🔧`);
  } else {
    res.json({
      message: "Object is valid, not logging. Check front end implementation.",
      error_id: payload.error_id,
    });
  }
});

module.exports = diagnostics;
