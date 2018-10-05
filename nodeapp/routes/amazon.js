"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
const request = require('request');
const pretty = require('pretty');
const rp = require('request-promise');

//Importing the functions and classes. 
const initial_data = require('../send_data_to_db')
const find_rh_value = require('../functions/amazon_functions_webpage')
const find_qid_value = require('../functions/amazon_functions_webpage')
const json_key_with_data = require('../functions/amazon_functions_api')
const escaping_characters = require('../functions/amazon_functions_api')
const ratings = require('../functions/amazon_functions_api')
const amazon_product_properties = require('../functions/amazon_functions_api')
const header = require("../functions/headers")







router.get('/amazon', function(req, res,next){
    console.log("Hitting amazon API")
    //saving ip, search term, time and website in db. 
    let search = 'water bottles'
    const ip = req.ip
    const site = "amazon.in" 
    let user = new initial_data(ip, search, site)
    user.user()

 
    let url_amazon =  `https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}`
    let headers = header.headers.amazon_headers 

    rp({
        method: 'GET',
        url: url_amazon,
        //proxy: 'http://190.81.162.134:53281',
        headers:headers,
        //Not parsing json like others as it is html. 
        //json: true
    })
    .then(function (response){
        
        console.log(response.data)
        var rh_value = find_rh_value.find_rh_value(response,search)
        var qid_value = find_qid_value.find_qid_value(response) 
        let fromHash = encodeURIComponent("ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=books+")
        let url =  `https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}+&rh=${rh_value}&fromHash=${fromHash}&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=${qid_value}&atfLayout=list`

    let response2 = axios({
        method: 'post',
        url: url,
        headers:headers
      })
    .then(function (response2) {
        let response_data2 = response2.data
        let amazon_json_obj = {"amazon_product":[]};

        let result = response_data2.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        let result2 = result.replace(/&&&/gm,'')
        let json_response_data2 = JSON.parse(result2)
        
        var data_array =json_key_with_data.json_key_with_data(json_response_data2)

        let i;
        var number_of_products = 0
        for (i in data_array){
            let $ = cheerio.load(data_array[i])
            let name = $('.s-access-title') 
            
            name.each(function(index,product){
                var name_ = $(product).text()
                console.log(name_)
                //remove the sponsered result. 
                let m
                let sponsored_regex = /\[Sponsored]/g;
                if ((m = sponsored_regex.exec(name_)) !== null) {
                    if (m.index === sponsored_regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    console.log("alert, sponsored product found")
                }   
                else{
                    let product_name = escaping_characters.escaping_characters(name_)
                    //Grabbing URL
                    const regex_url = new RegExp('<a .*? title=\"' + product_name +  '\\".*?href=\\"(.*?)\\">' , 'g')
                    let url = new amazon_product_properties(regex_url,data_array[i], "Name")
                    let product_url = url.product_properties()
                   
                    //Grabbing Image URL 
                    const regex_image = new RegExp('<img src=\\"(.*?)\\" srcset=\\".*?\\" width=\\".*?\\" height=\\".*?\\" alt=\\"'+ product_name + '\\"', 'g' )
                    let beautify_html = pretty(data_array[i]);
                    let image = new amazon_product_properties(regex_image, beautify_html,"Image URL")
                    let product_image_url = image.product_properties()
                     

                    //Grabbing price. 
                    const regex_price = new RegExp(product_name + '.*?<span class="currencyINR">.*?<\\/span>(.*?)<\\/span>', 'g' )
                    let price = new amazon_product_properties(regex_price, data_array[i], "Price")
                    let product_price = price.product_properties() 

                    //Grabbing ratings
                    let product_ratings =ratings.ratings(product_name, data_array[i])
                    
                    //Pushing data in the array. 
                    number_of_products = number_of_products+1
                    amazon_json_obj['amazon_product'].push({"product_name" : name_, "product_url" :product_url, "product_image_url":product_image_url, "prodcut_price":product_price, "product_ratings": product_ratings  });
                    amazon_json_obj["number_of_products"] = number_of_products  
                }
            })
        }
    let json_str = JSON.stringify(amazon_json_obj)    
    //res.send(json_response_data2)
    res.send(json_str)
    
    })
    .catch(function(err){
        let user_ = new initial_data(ip, search, site, true)
        user_.user()
        console.log('this is error',err)
        res.status(403)
        res.send(JSON.stringify({error_message:"something went wrong!"}))
    })
    

    })
        
    .catch(function(err){
        let user_ = new initial_data(ip, search, site, true)
        user_.user()
        console.log('this is error',err)
        res.status(403)
        res.send(JSON.stringify({error_message:"something went wrong!"}))
          
    })
})


module.exports = router;