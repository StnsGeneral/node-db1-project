const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      console.log(err);
      next({
        errorMessage: 'Something went wrong trying to fetch all accounts',
      });
    });
});

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      console.log(err);
      next({
        errorMessage: 'Something went wrong trying to fetch a specific account',
      });
    });
});

// router.post(
//   '/',
//   checkAccountPayload,
//   checkAccountNameUnique,
//   async (req, res, next) => {
//     // DO YOUR MAGIC
//     try {
//       const data = await Accounts.create({
//         name: req.body.name,
//         budget: req.body.budget,
//       });
//       res.json(data);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    Accounts.create(req.body)
      .then((newAccount) => res.status(201).json(newAccount))
      .catch((err) => {
        console.log(err);
        next({ errorMessage: 'Something went wrong trying to post' });
      });
  }
);

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then((updatedAccount) => {
      res.status(200).json(updatedAccount);
    })
    .catch((err) => {
      console.log(err);
      next({ errorMessage: 'Something went wrong trying to update' });
    });
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then((delAccount) => res.status(200).json(delAccount))
    .catch((err) => {
      console.log(err);
      next({ errorMessage: 'Something went wrong trying to delete' });
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  const message =
    err?.errorMessage || 'Something went wrong in the Accounts router';

  res.status(500).json({ message });
});

module.exports = router;
