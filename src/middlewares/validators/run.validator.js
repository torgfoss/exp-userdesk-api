import { validationResult } from 'express-validator';

const runValidators = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array() });
  }

  next();
};

export default runValidators;
