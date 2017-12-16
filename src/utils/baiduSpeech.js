import {speech} from "baidu-aip-sdk";

var APP_ID = "10539480";
var API_KEY = "tBCSMk8zntAwP2oS8XHA7PHs";
var SECRET_KEY = "5yeOy15VEw9NulF3H45pumOQ5IhZgDQa";

export default function(){
    return new speech(APP_ID, API_KEY, SECRET_KEY);
};