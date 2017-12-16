import speechClient, {rec} from "./../utils/baiduSpeech";
import fs from "fs";
 
export default[
    {
        method : 'POST',
        path : '/Speech',
        handler : function (request, reply) {
            if (request.payload && request.payload.content) {
                let voiceBuffer = Buffer.from(request.payload.content,'base64');
                rec(voiceBuffer, 5).then(function (result) {
                    console.log('<recognize>: ' + JSON.stringify(result));
                    reply(result);
                }, function (err) {
                    console.log(err);
                    reply({message: error.message});
                });
            } else {
                reply({message: "请上传文件"});
            }
        },
        config : {
            description: 'recognize words from voice',
            notes: 'recognize words from voice',
            tags: ['api'],
            payload: {
                maxBytes: 10485760
            }
        }
    }, {
        method : 'GET',
        path : '/Speech',
        handler : function (request, reply) {
            reply({message: "Test"});
        },
        config : {
            description: 'Test',
            notes: 'Test',
            tags: ['api']
        }
    }
];