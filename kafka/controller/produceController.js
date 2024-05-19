const ProducerController = require("./producer");

class Producer{
    async respond(req, res){
        try {
            const { ip, browser, os, device, code } = req.body;
            await ProducerController.produce_logic(ip, browser, os, device, code);
            res.status(200).json({ message: "Message sent successfully" });
        } catch (error) {
            console.error(`Unable to send message: ${JSON.stringify(error)}`, error);
            res.status(500).json({ message: "Unable to send message" });
        }
    }
}

module.exports = new Producer();