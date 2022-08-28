module.exports.ack = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>true</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>';
module.exports.nack = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>false</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>';

module.exports.processOutbound = (reqBody) => {
    let objList = [];

    for (let i = 0; i < reqBody['soapenv:Envelope']['soapenv:Body'][0]['notifications'][0]['Notification'].length; i++) {
        let parsedObject = {};

        Object.keys(reqBody['soapenv:Envelope']['soapenv:Body'][0]['notifications'][0]['Notification'][i]['sObject'][0]).forEach(key => {
            if (key !== '$') {
                parsedObject[key.replace(/sf:/g, '')] = reqBody['soapenv:Envelope']['soapenv:Body'][0]['notifications'][0]['Notification'][i]['sObject'][0][key][0].replace('/sf:/g', '');
            }
        });

        objList.push(parsedObject);
    };

    return objList
}