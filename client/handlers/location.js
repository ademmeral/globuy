
const QUERY = "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,query"
export const getLocation = async () => {
  return await (await fetch(
    `http://ip-api.com/json/?fields=${QUERY}`)
  ).json();
}