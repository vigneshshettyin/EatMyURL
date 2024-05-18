class HomeController {
    async index(req, res) {
        const response = {
            ver : '0.0.1',
            about : 'Kafka Producer API',
            author : 'Vignesh',
        }
        return res.status(200).json(response)
    }
}

module.exports = new HomeController()