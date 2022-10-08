const axios=require('axios')
const cheerio=require('cheerio')
const express=require('express')

async function getPriceFeed() {
    try{
        const siteUrl='https://coinmarketcap.com/trending-cryptocurrencies/'
        const{ data }=await axios({
            method: "GET",
            url: siteUrl,
        })

        const $ = cheerio.load(data)
        const elemSelector='#__next > div > div.main-content > div.sc-4vztjb-0.cLXodu.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
        const keys=[
            'rank',
            'name',
            '24h',
            '7d',
            '30d',
            'market cap',
            'volume(24h)'
        ]
        $(elemSelector).each((parentIdx,parentElem) => {
            let keyIdx = 0
            const coinObj={}
            if (parentIdx <=19){
                $(parentElem).children().each((childIdx, ChildElem) => {
                    let tdValue=$(ChildElem).text()

                    if(keyIdx===1||keyIdx===6){
                        tdValue=$('p:first-child', $(ChildElem).html()).text()
                    }

                    if(tdValue){
                        coinObj[keys[keyIdx]]=tdValue

                        keyIdx++
                    }
                })

                console.log(coinObj)
            }
        })
    }catch(err){
        console.error(err)
    }

}


getPriceFeed()