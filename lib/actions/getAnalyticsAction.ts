'use server'
import axios from 'axios'

export async function getAnalyticsAction(shortcode:string){
    const apiKey = process.env.CLICKHOUSE_API_KEY;
    const url = process.env.CLICKHOUSE_URL;

    const analyticsUrl = url + `analytics?code=${shortcode}&aspect=`
    
    const browserData = await axios.get(analyticsUrl + `browser`,{
        headers :{
            'apikey':apiKey
        }
    })
    const osData = await axios.get(analyticsUrl + `os`,{
        headers :{
            'apikey':apiKey
        }
    })
    const countryData = await axios.get(analyticsUrl + `country`,{
        headers :{
            'apikey':apiKey
        }
    })
    const cityData = await axios.get(analyticsUrl + `city`,{
        headers :{
            'apikey':apiKey
        }
    })
    const deviceData = await axios.get(analyticsUrl + `device`,{
        headers :{
            'apikey':apiKey
        }
    })

    const totalEngagements = await axios.get(url+`total?code=${shortcode}`,{
        headers:{
            'apikey':apiKey
        }
    })


    // converting the date to required format needed by the clickhouse db
    const enddate = new Date().toISOString().split('T')[0]
    const nowDate = new Date()
    nowDate.setDate(nowDate.getDate() - 7)
    const startdate = nowDate.toISOString().split('T')[0]

    const weeklyEngagements = await axios.get(url+`weekly?code=${shortcode}&startdate=${startdate}&enddate=${enddate}`,{
        headers:{
            'apikey':apiKey
        }
    })

    // converting it to required format needed by the page
    const browser:any = {}
    browser['Others'] = 0
    if(browserData.data.length != 0){
        for(let i=0;i<browserData.data.length;i++){
            if(browserData.data[i].browser == ''){
                browser['Others'] += browserData.data[i].record_count
            }
            else
                browser[browserData.data[i].browser] = browserData.data[i].record_count;
        }
    }

    const os:any = {}
    os['Others'] = 0
    if(osData.data.length != 0){
        for(let i=0;i<osData.data.length;i++){
            if(osData.data[i].os==''){
                os['Others'] += osData.data[i].record_count
            }
            else
                os[osData.data[i].os] = osData.data[i].record_count;
        }
    }

    const devices:any = {}
    devices['Others'] = 0
    if(deviceData.data.length != 0){
        for(let i=0;i<deviceData.data.length;i++){
            if(deviceData.data[i].device == ''){
                devices['Others'] += deviceData.data[i].record_count
            }
            else
                devices[deviceData.data[i].device] = deviceData.data[i].record_count;
        }
    }

    // calculating weekly engages
    let last7DaysEngage = 0;
    let engagement = 0;

    if(weeklyEngagements.data.length != 0){
        last7DaysEngage = weeklyEngagements.data[0].record_count
    }

    if(totalEngagements.data.length != 0){
        engagement = totalEngagements.data[0].record_count
    }

    // logic for countries list -> again for require format
    let country:any = countryData.data
    let rem_countries = 0

    if(country.length != 0){
        let totalClicks = 0;
        for(let i = 0;i<countryData.data.length;i++){
            totalClicks += Number.parseInt(countryData.data[i].record_count);
        }
        for(let i = 0;i<countryData.data.length;i++){
            if(country[i]['country'] == ''){
                rem_countries += Number.parseInt(country[i].record_count);
                delete country[i]
                continue
            }
            country[i]['id'] = i+1;
            country[i]['engagements'] = country[i].record_count
            country[i]['percentage'] = ((Number.parseInt(country[i].record_count)/totalClicks)*100).toFixed(2);
        }
        
        
        if(rem_countries > 0){
            country.push({
                id: country.length + 1,
                country: 'Others',
                engagements: rem_countries,
                percentage: ((rem_countries/totalClicks)*100).toFixed(2)
            })
        }
    }
    
    // counter to avoid the deleted keys -> coz the location name was empty
    let cnt = 0;
    // fixing the indexing of the country list
    for(let i = 0;i<country.length;i++){
        if(country[i]){
            country[i]['id'] = cnt+1;
            cnt++;
        }
    }

    let weeklyChange = 0;
    
    if(engagement-last7DaysEngage != 0){
        weeklyChange = last7DaysEngage/(engagement-last7DaysEngage)*100;
    }
    else{
        weeklyChange = 100
    }

    weeklyChange = Number.parseFloat(weeklyChange.toFixed(2))

    return {
        browser,
        os,
        locations:country,
        city : cityData.data,
        devices,
        engagement,
        last7DaysEngage,
        weeklyChange
    }
}