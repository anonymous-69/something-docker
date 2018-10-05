"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');
var rp = require('request-promise');
const initial_data = require('../send_data_to_db')
var header = require("../functions/headers")


router.get('/flipkart', function(req,res){
    const search = "ps4 games " 
    const ip = req.ip
    const site = "flipkart.com" 
    let user = new initial_data(ip, search, site)
    user.user()
    const  search_term = encodeURI(search);
    const url_flipkart = "https://www.flipkart.com/api/4/page/fetch"
    const headers = header.headers.flipkart_headers 
               
    const payload = {
        "pageUri":`/search?q=${search_term}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`,
        "pageContext":{
            "paginatedFetch":false,
            "pageNumber":1,
            "fetchSeoData":true
        }
        ,"requestContext":{
            "type":"BROWSE_PAGE","ssid":"77tw95kkog0000001537966890125","sqid":"j5lw9681gw0000001537966890125"}}
    
    rp({
        method: 'POST',
        url: url_flipkart,
        //proxy: 'http://190.81.162.134:53281',
        headers:headers,
        body:payload,
        json: true,
    })
    .then(function (response) {
        var response_data = response
        
        var products = response_data.RESPONSE.slots
        var number_of_products
        var flipkart_json_obj = {"flipkart_product":[]};
        var number_of_products = 0
        products.map(function(item, index){
            if (!("widget" in item )){
                console.log("no widget")
                }
                else{
                    var y = item.widget
                    
                    if (!("data" in  y )){
                        console.log("no data")
                    }
                    else{
                        var x = item.widget.data
                        if (!("products" in x)){
                            console.log("no products")
                        }
                        else if ("products" in x){
                            let i 
                            for (i in x.products){
                                console.log(i)
                                var product_title = x.products[i].productInfo.value.titles.title
                                var price = x.products[i].productInfo.value.pricing.finalPrice.decimalValue
                                var ratings = x.products[i].productInfo.value.rating.average
                                var total_rating_number = x.products[i].productInfo.value.rating.count // no of users who gave it rating 
                                var product_url = x.products[i].productInfo.value.smartUrl
                                var product_image = x.products[i].productInfo.value.media.images[0].url
                            

                                const image_height = product_image.replace(/\{@height\}/gm, '832');
                                const image_width = image_height.replace(/\{@width\}/gm, '832');
                                const image_quality = image_width.replace(/\{@quality\}/gm, '70');
                                console.log(image_quality)
                                //let image_url
                                let image_url = String(image_quality) 
                                console.log(typeof(image_url))
                                number_of_products = number_of_products+1 
                                flipkart_json_obj['flipkart_product'].push({"product_name" : product_title, "product_url" :product_url, "product_rating": ratings,"product_image_url":image_quality, "product_price":price,"product_total_people_rated" : total_rating_number });
                                flipkart_json_obj['number_of_products'] = number_of_products
                                console.log(number_of_products)
                            
                            }
                        }
                        else {
                            res.send("No product or check if you spelled it correctly. ")
                        }
                    }
                    console.log("_______________________________--")
                }
                
        })
   

        let json_str = JSON.stringify(flipkart_json_obj)
        res.send(json_str)
        })
    .catch(function(err){
        let user_ = new initial_data(ip, search, site, true)
        user_.user()
        console.log(err)
        res.status(403) 
        res.send(JSON.stringify({error_message:"something went wrong!"}))
    })
      
      
})

module.exports = router;