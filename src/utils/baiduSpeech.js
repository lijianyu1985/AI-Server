import {speech} from "baidu-aip-sdk";

var APP_ID = "10539480";
var API_KEY = "tBCSMk8zntAwP2oS8XHA7PHs";
var SECRET_KEY = "5yeOy15VEw9NulF3H45pumOQ5IhZgDQa";

export default function () {
    return new speech(APP_ID, API_KEY, SECRET_KEY);
};

var commonSpeech = new speech(APP_ID, API_KEY, SECRET_KEY);

export function rec(voiceBuffer, times) {
    return commonSpeech
        .recognize(voiceBuffer, 'amr', 8000)
        .then(function (result) {
            if (result.err_no === 0) {
                return {speech: result.result};
            } else {
                if (times > 0) {
                    return rec(voiceBuffer, times--);
                } else {
                    return {message: result.err_msg};
                }
            }
        }, function (err) {
            return {message: result.err_msg};
        });
}