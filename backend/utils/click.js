const { ErrorResponse } = require('./errorResponse');
const geoip = require('geoip-lite');
const useragent = require('useragent');
const links = require('../models/link')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


exports.Clicks = async (req, code) => { 
    const { 'user-agent': userAgent } = req.headers;
    // console.log(req)
    const {'true-client-ip': ipAddress} = req.headers;
    const referrer = req.headers.referer || req.headers.referrer;
    // console.log(referrer)
    let referer;
    if (referrer) {
        referer = new URL(referrer).hostname;
    } else {
        referer = 'Unknown';
    }
   
    // console.log(referer)
    let source;
    if (referer.includes('whatsapp')) {
        source = 'whatsapp';
    } else if (referer.includes('facebook')) {
        source = 'facebook';
    } else if (referer.includes('twitter')) {
        source = 'twitter';
    } else if (referer.includes('instagram')) {
        source = 'instagram';
    } else {
        source = 'others';
    }
    // Use geoip-lite to get location information based on IP address
    const geo = geoip.lookup(ipAddress);

    let state = geo ? geo.region : 'Unknown';
    let country = geo ? geo.country : 'Unknown';

    //check if the state and country is known
    if (state === '') {
        state = 'Unknown';
    }
    if (country === 'NG' && state === 'Unknown') state = 'Lagos', country = 'Nigeria';
   

    // Get device information from user agent string
    const agent = useragent.parse(userAgent);
    const osFamily = agent.os.toString();

    let device;
    if (osFamily.includes('Android')) {
        device = 'Android';
    } else if (osFamily.includes('iOS')) {
        device = 'iOS';
    } else if (osFamily.includes('Windows')) {
        device = 'Windows';
    } else if (osFamily.includes('Mac')) {
        device = 'Mac';
    } else if (osFamily.includes('Linux')) {
        device = 'Linux';
    } else {
        device = 'Others';
    }
    

    const location = `${state}, ${country}`;
    
    const clicks = await links.findOne({linkCode:code})

    if (!clicks) {
        return next(new ErrorResponse('Clicks not found', 404));
    }

    clicks.Analytics.click += 1;
    clicks.Analytics.device.push(device);
    clicks.Analytics.location.push(location);
    clicks.Analytics.source.push(source);

    await clicks.save();

    return clicks
}


