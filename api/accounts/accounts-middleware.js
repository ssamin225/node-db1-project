const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if (!name || !budget) {
    next({ status: 400, message: 'name and budget are required!' })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      const account = accounts.find(acc => acc.name === req.body.name)
      if (account) {
        next({ status: 409, message: 'name must be unique!' })
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
        next({ status:404, message: 'account not found!' })
      }
    }).catch(next)
}
