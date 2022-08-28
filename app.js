const express = require('express')
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const app = express();
const port = process.env.PORT

app.use(bodyParser.xml());
app.listen(port, () => console.log(`App started.`));

const outboundService = require('./utils/outbound_service');

app.post('/case', (req, res) => {
    try {
        let outboundList = outboundService.processOutbound(req.body);
        
        console.log('outboundList', outboundList);

        if(outboundList[0].Priority === 'Low'){
            return res.send(outboundService.nack);
        }

        return res.send(outboundService.ack);
    } catch (exception) {
        return res.send(outboundService.nack);
    }
});

// Challenge code:
app.post('/case-comment', (req, res) => {
    try {
        let outboundList = outboundService.processOutbound(req.body);
        console.log('outboundList', outboundList);

        return res.send(outboundService.ack);
    } catch (exception) {
        return res.send(outboundService.nack);
    }
});
