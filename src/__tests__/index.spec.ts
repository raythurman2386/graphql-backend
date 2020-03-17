const { GraphQLSchema } = require('graphql')
const EasyGraphQLTester = require('easygraphql-tester')
import mainSchema from '../types'
import mainResolvers from '../resolvers'

const schema = new GraphQLSchema({
  typeDefs: mainSchema,
  resolvers: mainResolvers
})

const tester = new EasyGraphQLTester(schema)

const query = `
  query:{ jobs { machine complaint } }
`

tester.graphql(query, undefined, undefined, { isLocal: false })
  .then((res: any) => console.log(res))
  .catch((err: any) => console.log(err))
