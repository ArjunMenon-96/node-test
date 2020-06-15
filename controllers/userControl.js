module.exports = (app, UserModel, randtoken) => {

    app.post('/login', (req, res) => {

        try {

            var username = req.body.username;
            var password = req.body.password;

            UserModel.findOne({ username: username }, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: "User not found."
                    })
                } else if (password == result.password) {
                    return res.status(200).json({
                        message: "success",
                        accessToken: result.accessToken
                    });
                } else {
                    return res.status(401).json({
                        message: "Password incorrect."
                    })
                }
            });

        } catch (error) {
            res.send(error);
        }

    });

    app.post('/register', (req, res) => {

        try {

            var token = randtoken.generate(16);

            let entry = new UserModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                address: req.body.address,
                accessToken: token
            });

            entry.save().then(() => {
                return res.status(201).json({
                    message: "new user created"
                });
            }).catch((e) => {
                return res.status(400).json({
                    message: "error occurred"
                })
            });
        } catch (error) {
            res.send(error);
        }
    });

    app.get('/fetch-users', (req, res) => {

        UserModel.find().then((resp) => {
            return res.status(201).json({
                success: true,
                data: resp
            });
        });
    });

}