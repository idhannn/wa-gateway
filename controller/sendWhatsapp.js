const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('Client is ready!')
})


client.initialize();

const sendMessage = async (req, res) => {
    try {
        
        let number = `${req.body.number}@c.us`;
        if (number.startsWith('0')) {
            number = `62${number.substring(1)}`
        } else if (number.startsWith('62')) {
            number = number
        } else {
            number = `62${number}`
        }


        const message = req.body.message;
        const isRegister = await client.isRegisteredUser(number);

        if (isRegister) {
            client.sendMessage(number, message).then(() => {
                res.json({
                    success: true,
                    number,
                    message
                })
            })
        } else {
            res.json({
                success: false,
                message: "Number not registered"
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { sendMessage };