const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { args }) => {
            const foundUser = await User.findOne({
                args
            }).populate('savedBooks');
            return foundUser;
        },
        user: async () => {
            return User.find({});
        },
        me: async (parent, args, context) => {
            if (context.user) {
            return User.findOne({_id: context.user._id})
        }
        throw new AuthenticationError('You need to be logged in, Try Again'); 
        },
    },

    Mutation: {
        login: async (parent, {password, email}) => {
            const user= await User.findOne({email});

            if(!user) {
                throw new AuthenticationError ('Incorrect Credentials, Please try again');
            }
             const correctPw = await user.isCorrectPassword(password);

             if (!correctPw) {
                 throw new AuthenticationError ('Incorrect Credentials, Please try again');
             }

             const token = signToken (user);

             return {token, user};
        },

        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return {token, user};

        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true, runValidators: true }
                );

                return updatedUser;
            }
  
            throw new AuthenticationError('Please Login First!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Please Login First!');
          },
    }
};

module.exports = resolvers