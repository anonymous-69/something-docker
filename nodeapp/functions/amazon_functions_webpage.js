"use strict"

function find_rh_value(amazon_webpage_response, search){
	let search2 = search.replace(/\+/gm,'\\+')
    let regex_rh = new RegExp('rh=(.*?)&.*?'+ search2 , 'g')
    console.log(regex_rh)
    let rh;
    //Do something when these if statements fail. 
    if ((rh = regex_rh.exec(amazon_webpage_response)) !== null) {
    	console.log("rh please be here")
            if (rh.index === regex_rh.lastIndex) {
                regex.lastIndex++;
            }
        let rh_value = rh[1]
        return rh_value 
    }
    else{
        console.log("no rh value")
        let rh_value = "n%3A2591141031%2Ck%3Aps4+games"
        return rh_value 
    }
}


function find_qid_value(amazon_webpage_response){
	let qid
    let regex_qid = /qid=(.*?)\"/g
    if ((qid = regex_qid.exec(amazon_webpage_response)) !== null) {
        if (qid.index === regex_qid.lastIndex) {
            regex.lastIndex++;
        }
    
        var qid_value =  qid[1]
		console.log("this is qid_value,   ", qid[1])
        return qid_value
        
    }
    else{
        console.log("No qid value")
        return qid_value
        var qid_value = "1536936862"
    }
}




module.exports.find_qid_value = find_qid_value
module.exports.find_rh_value = find_rh_value