const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controller/sendWhatsapp');

router.get('/', (req, res) => {
    res.send('Whatsapp Gateway by handev')
})
router.post('/send', sendMessage)

module.exports = router;