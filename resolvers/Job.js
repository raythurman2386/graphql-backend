const { Tech } = require('../models/Model')

function tech(parent, args) {
  return Tech.findBy({ id: parent.id })
}

module.exports = {
  tech
}
