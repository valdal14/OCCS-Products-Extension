const fetch = require('node-fetch');
require('dotenv').config()

class OCCS {
    constructor(url, username, password, categoryId){
        this.url = url
        this.username = username,
        this.password = password,
        this.categoryId = categoryId
        this.endpointLogin = '/ccstore/v1/login',
        this.endpointProducts = '/ccstore/v1/products'
        this.token = '';
        this.products = [];
    }

    getToken(){
        return new Promise((resolve, reject) =>{

            fetch(this.url + this.endpointLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=password&username=${this.username}&password=${this.password}`
            })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                resolve(data.access_token);
            })
            .catch(error =>{
                reject(error);
            })
        })
        .then(token =>{
            this.token = token;
        })
        .catch(error =>{
            console.log(error);
        })
    }

    getProduct(req, res){
        return new Promise((resolve, reject)=>{

            fetch(this.url + this.endpointProducts + `?catalogId=${this.categoryId}&limit=6`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            .then(response =>{
                return response.json();
            })
            .then(products =>{
                resolve(products);
            })
            .catch(error =>{
                reject(error);
            })
        })
        .then(products =>{
            this.parseProducts(products);
            //send the data back
            res.status(201).json(this.products);
            
        })
        .catch(error =>{
            console.log(error);
        })
    }

    parseProducts(arrayOfProducts){
        for(var p in arrayOfProducts){
            
            for(var i in arrayOfProducts[p]){
                
                if(arrayOfProducts[p][i].id !== undefined){
                    this.products.push({
                        id: arrayOfProducts[p][i].id,
                        name: arrayOfProducts[p][i].displayName,
                        image: arrayOfProducts[p][i].primaryMediumImageURL,
                        price: arrayOfProducts[p][i].listPrice
                    });
                }
            }
        }
    }
}

let occs = new OCCS(process.env.OCCSURL, process.env.USER, process.env.PWD, process.env.CATEGORY);

module.exports.Occs = occs;



