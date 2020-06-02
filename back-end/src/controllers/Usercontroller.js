const User = require('../models/User');

module.exports = {
    async store(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const existentUser = await User.findOne({ email });

            if (!existentUser) {
                const user = await User.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                    return res.json(user);
            } else {
                return res.status(400).json({
                    message: 'There already exists an account with that email. Try loggin in instead!'
                })
            }
        } catch (err) {
            throw Error(err)
        }
    },

    async getById(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });

        } catch (error) {
            return res.status(400).json({
                message: "Could not find any user with that id."
            })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) {
                if (password === user.password) {
                    return res.status(200).json(user._id);
                } else {
                    return res.status(401).json({
                        message: 'Username and Password does not match.'
                    })
                }
            } else {
                return res.status(400).json({
                    message: 'Could not find any user with that e-mail. Wanna create a new account instead?'
                })
            }
        } catch (error) {
            throw Error(error)
        }
    },
}