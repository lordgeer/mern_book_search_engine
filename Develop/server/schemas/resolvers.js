const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            return User.findOne({_id: context.user._id}).populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in, Try Again'); 
        },
    },
};

module.exports = resolvers