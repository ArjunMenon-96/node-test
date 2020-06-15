module.exports = (app, ArticleModel) => {

    app.post('/articles', (req, res) => {

        try {

            let article = new ArticleModel({
                title: req.body.title,
                body: req.body.body,
                author: req.body.author,
            });

            article.save().then(() => {
                return res.status(201).json({
                    message: "new article created"
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

    app.get('/articles', (req, res) => {

        ArticleModel.find().then((resp) => {
            return res.status(200).json({
                success: true,
                data: resp
            });
        });
    });

}