const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if (!name || budget === undefined) {
    next({ status: 400, message: 'name and budget are required!' })
  } else if (typeof name !== 'string') {
    next({ status: 400, message: 'name of account must be a string' });
  } else if (!parseInt(budget)) {
    next({ status: 400, message: 'budget of account must be a number' });
  } else if (!name.trim()) {
    next({ status: 400, message: 'name and budget are required' });
  } else if (3 > name.trim().length  || name.trim().length > 100) {
    next({ status: 400, message: 'name of account must be between 3 and 100' });
  } else if(budget < 0 || budget > 1000000){
    next({ status: 400, message: 'budget of account is too large or too small'  });
  } else {
    req.body.name = name.trim()
    next();
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      const account = accounts.find(acc => acc.name === req.body.name)
      if (account) {
        next({ status: 400, message: 'that name is taken' })
      } else {
        next()
      }
    }).catch(next)
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then(account => {
      if (account) {
        req.account = account
        next()
      } else {
        next({ status:404, message: 'account not found' })
      }
    }).catch(next)
}
