const graphql = require('graphql');
const _ = require('lodash');
const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

const users = [
	{ id: '23', firstName: 'Bill', age: 20 },
	{ id: '47', firstName: 'Samantha', age: 21}
];
/**
 * Definition User Type for GraphQL
 * @type {GraphQLObjectType} - Create GraphQL object define a User type 
 */
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString},
		age: { type: GraphQLInt } 
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
				/* data of that UserType with id */
				return _.find(users, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({ 
	query: RootQuery
});