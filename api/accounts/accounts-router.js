const router = require('express').Router()
const Account = require('./accounts-model')
const { 
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload 
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      res.json(accounts)
    }).catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', [checkAccountPayload, checkAccountNameUnique], (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
    .then(newAccount => {
      res.json(newAccount)
    })
    .catch(next)
})

router.put('/:id', [checkAccountId, checkAccountPayload, checkAccountNameUnique], (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.params.id, req.body)
    .then(updated => {
      res.json(updated)
    }).catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
    .then(deleted => {
      res.json(deleted)
    }).catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
