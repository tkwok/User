const graphql = require('graphql');
//const _ = require('lodash');
const axios = require('axios');
const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;


/**
 * Definition Company Type for GraphQL
 * @type {GraphQLObjectType} - Create GraphQL object define a Company type 
 */
const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	}
});

/**
 * Definition User Type for GraphQL
 * @type {GraphQLObjectType} - Create GraphQL object define a User type 
 */
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString},
		age: { type: GraphQLInt },
		company: { 
			type: CompanyType,
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(resp => resp.data);
			}
		}
	}
});
/**
 * Definition of a Root query for the data structure entry-point
 * If you give me arg of id in type String, will return the UserType with that id
 * @type {GraphQLObjectType} - Create GraphQL object define the Root query
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				/* data of that UserType with id
				Can return a promise */
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({ 
	query: RootQuery
});