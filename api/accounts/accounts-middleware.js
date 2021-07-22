const db = require('../../data/db-config');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    if (!req.body.name || !req.body.budget) {
      res.status(400).json({ message: 'name and budget are required' });
    } else if (typeof req.body.name !== 'string') {
      res.status(400).json({ message: 'name of account must be a string' });
    } else if (
      req.body.name.trim().length < 3 ||
      req.body.name.trim().length > 100
    ) {
      res
        .status(400)
        .json({ message: 'name of account must be between 3 and 100' });
    } else if (typeof req.body.budget !== 'number') {
      res.status(400).json({ message: 'budget of account must be a number' });
    } else if (req.body.budget < 0 || req.body.budget > 1000000) {
      res
        .status(400)
        .json({ message: 'budget of account is too large or too small' });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

// exports.checkAccountNameUnique = async (req, res, next) => {
//   // DO YOUR MAGIC
//   try {
//     const account = await Accounts.getById(req.params.id);

//     if (account) {
//       res.status(400).json({ message: 'that name is taken' });
//     } else {
//       next();
//     }
//   } catch (e) {
//     next(e);
//   }
// };

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first();

    if (existing) {
      next({ status: 400, message: 'that name is taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id);

    if (!account) {
      res.status(404).json({ message: 'account not found' });
    } else {
      res.locals.account = account;
      next();
    }
  } catch (e) {
    next(e);
  }
};
