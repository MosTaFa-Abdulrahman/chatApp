const router = require("express").Router();
const studentModel = require("../models/student.model");

//  || Accsess Data ||
let secretKey =
  "This Is Secret Key 46844515241245545412178923yu23yue2tgy2geghjs2yiu";
verifToken = (req, res, next) => {
  // let toke2 = res.header(authorization)
  let token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ msg: "Accsess Rejected...... !!" });
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//          || Secure API ||
var privateKey = "darsh"; //              Store This In DB
var clientKey = "123456789"; //           Store This In DB
verifySecretClient = (req, res, next) => {
  if (req.params.private == privateKey && req.params.client == clientKey) {
    next();
  } else {
    res.status(400).json({
      error:
        "You Cant access this route because you sent me secret and client key !",
    });
  }
};

router.post("/addstudent", (req, res, next) => {
  studentModel
    .postStudent(
      req.body.firstName,
      req.body.lastName,
      req.body.age,
      req.body.phone
    )
    .then((user) => res.status(200).json({ user: user }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.get("/getstudents", (req, res, next) => {
  studentModel
    .getStudents()
    .then((users) => res.status(200).json({ user: users }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.delete("/deletestudent/:id", (req, res, next) => {
  let id = req.params.id;
  studentModel
    .deleteStudent(id)
    .then((user) => res.status(200).json({ user: user, msg: "user Delete ♠" }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.patch("/updatestudent/:id", (req, res, next) => {
  let id = req.params.id;
  studentModel
    .updateStudent(
      id,
      req.body.firstName,
      req.body.lastName,
      req.body.age,
      req.body.phone
    )
    .then((user) => res.status(200).json({ user: user, msg: "user Updated ♠" }))
    .catch((err) => res.status(400).json({ err: err }));
});

module.exports = router;
