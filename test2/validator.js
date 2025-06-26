const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();

app.use(express.json());

const validateUser = [
  body('role').notEmpty().withMessage('Role is required'),
  body('phone')
    .if(body('role').equals('admin'))
    .notEmpty().withMessage('Phone number is required for admin')
    .isMobilePhone().withMessage('Invalid phone number'),
];

// console.log(validateUser)

app.post('/', validateUser, (req, res) => {
  const errors = validationResult(req);
  console.log(req.errors)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('User registered');
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
