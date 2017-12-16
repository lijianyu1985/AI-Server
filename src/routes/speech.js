import speechClient from "./../utils/baiduSpeech";

export default[
    {
        method : 'POST',
        path : '/Speech',
        handler : function (request, reply) {
            if (request.payload && request.payload.content) {
                let voiceBuffer = new Buffer(request.payload.content);
                speechClient()
                    .recognize(voiceBuffer, 'amr', 8000)
                    .then(function (result) {
                        console.log('<recognize>: ' + JSON.stringify(result));
                        if (result.err_no === 0) {
                            reply({speech: result.result});
                        }
                        else {
                            reply({message: result.err_msg});
                        }
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
    },
    {
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