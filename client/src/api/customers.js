const cors = require("cors");
const router = require("express").Router();

// NOTE
// Research about the cors module

router.get("/", cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];

  res.json(customers);
});

module.exports = router;
