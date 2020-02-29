const { Tech } = require('../models/Model')

function tech(parent, args) {
  return Tech.findBy({ tech_id: args.tech })
}

module.exports = {
  tech
}
