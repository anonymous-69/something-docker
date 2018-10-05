const express = require('express');
const router = express.Router();
const Regex = require('regex');
const axios = require('axios')
const JSON = require('circular-json');
const pretty = require('pretty');
const initial_data = require('../send_data_to_db')


//scrapping the key having most of the products. 
function json_key_with_data(json_response_data2){

	if (!("centerBelowPlus" in json_response_data2)){
        let min_product_whitespace = json_response_data2.centerMinus.data.value
        let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [min_products]
        console.log('No data in  max_products')
        return data_array
    }
    else if (!("centerMinus" in json_response_data2 )){
        let max_product_whitespace = json_response_data2.centerBelowPlus.data.value
        let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [max_products]
        console.log("no data in min_products")
        return data_array
    }
    else if ("centerBelowPlus" in json_response_data2 && "centerMinus" in json_response_data2 ){
        console.log("all data ")
        let min_product_whitespace = json_response_data2.centerMinus.data.value
        let max_product_whitespace = json_response_data2.centerBelowPlus.data.value
        let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [max_products, min_products ]
        return data_array
    }
    else{
        console.log("No data. ")
        let user_ = new initial_data(ip, search, site, true)
        user_.user()
        res.send("No product or check if you spelled it correctly. ")
        return            
    }

}


function escaping_characters(product_title){
	let newData0 = product_title.replace(/\(/gm,'\\(')
    let newData1 = newData0.replace(/\//gm,'\\/')
    let newData2 = newData1.replace(/\)/gm,'\\)')
    let newData3 = newData2.replace(/\+/gm,'\\+')
    let newData4 = newData3.replace(/\[/gm,'\\[')
    let newData5 = newData4.replace(/\[/gm,'\\]')
    let newData6 = newData5.replace(/\|/gm,'\\|')
    let newData7 = newData6.replace(/\./gm,'//.')
    return newData7
}

function product_image(product_name){
	const regex_image = new RegExp('<img src=\\"(.*?)\\" srcset=\\".*?\\" width=\\".*?\\" height=\\".*?\\" alt=\\"'+ product_name + '\\"', 'g' )
    console.log(regex_image)
    //Grabbing image url 
    
    let image_url
    let beautify_html = pretty(data_array[i]);
    if ((image_url = regex_image.exec(beautify_html))!== null) {
        console.log("----------------------------------------------")
        
        if (image_url.index === regex_image.lastIndex) {
            regex_image.lastIndex++;
        }
        var product_image_url = image_url[1]
        console.log(product_image_url)
    }

    else{
        console.log("no image url found")
        var product_image_url = 'image not available'
        
    }
}

 
class amazon_product_properties{
	constructor(regex,data_array, product_property ){
		this.regex = regex, 
		this.data_array = data_array
		this.product_property = product_property
	}

	product_properties(){
		let x;
		console.log(this.regex)
		if ((x = this.regex.exec(this.data_array)) !== null) {
	        if (x.index === this.regex.lastIndex) {
	            regex.lastIndex++;
	        }
	        let property = x[1]
	        console.log(property)
	        return property

	    }
	    else{
	        console.log(this.product_property +'URL not available')
	        let property = this.product_property +'URL not available'
	        return property
	        
	    }

	}
}


function ratings(product_name, data_array){
	const regex_rating = new RegExp('>' + product_name + '<.*?(.*?) out of 5', 'gm')
    let rating;
    if ((rating = regex_rating.exec(data_array))!== null) {

        if (rating.index === regex_rating.lastIndex) {
            regex_rating.lastIndex++;
        }
        //rating gives some long ass string.   
        let ratings_string = rating[1].split(" ").splice(-1)[0];
        // ratings_string gives span class="a-icon-alt"
        let regex_rating_number = /.*?>(.*)/gm;
        let rating_number
        if ((rating_number = regex_rating_number.exec(ratings_string))!== null) {

            if (rating_number.index === regex_rating_number.lastIndex) {
                regex_rating_number.lastIndex++;
            }
        
        var product_ratings = rating_number[1]
        console.log(product_ratings)
        }
        else{
            console.log("unable to find ratings string- span class=\"a-icon-alt\" ")
            var product_ratings = "unable to find ratings data"
        }
    
    }
    else{
        console.log("Unable to grab ratings")
        var product_ratings = "unable to find ratings data"
    }
}



module.exports = amazon_product_properties
//module.exports.product_url = product_url
module.exports.ratings = ratings
//module.exports.product_url = product_url
module.exports.escaping_characters = escaping_characters
module.exports.json_key_with_data = json_key_with_data