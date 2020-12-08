import _ from 'lodash'
import dayjs from 'dayjs';

export default class WeatherForecastAPI {
    constructor() {
        this.apiKey = '0817a7a62450770c8fc222e0851ce9b2';
        this.baseUrl = `http://api.openweathermap.org/data/2.5/forecast?q=<%= city %>&appid=${this.apiKey}`;
        this.cache = [];
        this.keepAlive = 60;
        this.lastCache = null;
    }

    async get(city, dateTime) {
        if (!city || !dateTime) return '';
        this.validateCache();
        const date = dayjs(dateTime);
        const formattedDate = date.format("YYYY-MM-DD");
        const today = dayjs();

        /* The provided API does not support historical data on free tier */
        if (date.isBefore(today, 'day')) return { status: 'error', msg: 'Historical data not available' };

        /* The provided API only supports 5-day forecast on free tier */
        if (date.diff(today, 'day') > 5) return { status: 'error', msg: 'Forecast is limited to 5 days' };

        const hasCache = this.hasCache(city, formattedDate);
        if (hasCache) return this.getFromCache(city, dateTime);

        const url = _.template(this.baseUrl)({ city });
        const that = this;

        return await fetch(url)
            .then((response) => response.json())
            .then((data) => that.processResult(data, city, dateTime))
            .catch(() => ({ status: 'error', msg: 'Error on fetching forecast' }));
    }

    processResult(payload, city, dateTime) {
        if (payload.cod !== "200") return this.parseError(payload);

        const date = dayjs(dateTime).format("YYYY-MM-DD");
        const hasCache = this.hasCache(city, date);

        if (!hasCache) this.addCache(city, payload);
        const cacheValue = this.getCache(city);
        return this.getWeather(cacheValue.data, dateTime);
    }

    getFromCache(city, dateTime) {
        const cacheValue = this.getCache(city);
        return this.getWeather(cacheValue.data, dateTime);
    }

    getWeather(data, dateTime) {
        const parsedDate = dayjs(dateTime);
        const date = parsedDate.format("YYYY-MM-DD");
        const dateList = data.filter(t => t.date === date);
        if (!dateList.length) {
            const today = dayjs().format("YYYY-MM-DD");
            /* The provided API does not return today forecast at the end of the day */
            if (date === today) return { status: 'error', msg: 'There is no forecast for today.' };
            else return { status: 'error', msg: 'Data not found.' };
        }

        const hour = parsedDate.get('hour');
        let closestDivisible = 0;

        /* 
        * As WeatherAPI returns forecast three hours apart,
        * I am getting the closest forecast to the provided time
        */
        if (hour % 3 === 0) closestDivisible = hour;
        else {
            const lowerBoundary = hour - (hour % 3);
            const higherBoundary = (hour + 3) - (hour % 3);
            closestDivisible = hour - lowerBoundary > higherBoundary - hour ? higherBoundary : lowerBoundary;
        }

        let datum = _.find(dateList, t => t.time === `${_.padStart(closestDivisible, 2, '0')}:00:00`);
        if (!datum) {
            /* If there is not a forecast for the provided time, the first one of the day is picked */
            datum = _.chain(dateList).sortBy(t => t.time).first().value();
        }

        return { status: 'success', weather: (datum && datum.weather) || "" };
    }

    hasCache(city, date) {
        return this.cache.some(t => {
            return t.city === city && t.data.some(u => u.date === date);
        });
    }

    getCache(city) {
        return _.find(this.cache, t => t.city === city);
    }

    addCache(city, payload) {
        const data = payload.list.map(t => {
            const dt = t.dt_txt.trim().split(' ');
            const date = dt[0];
            const time = dt[1];

            return {
                date,
                time,
                weather: _.first(t.weather).main
            }
        });

        this.cache.push({
            city,
            data
        });
    }

    parseError(payload) {
        switch (payload.cod) {
            case "404": return { status: 'error', msg: 'City not found' };
            default: return { status: 'error', msg: 'Error on fetching forecast' };
        }
    }

    validateCache() {
        if (!this.lastCache) this.lastCache = dayjs();

        const diff = dayjs().diff(this.lastCache, 'minute');
        if (diff > this.keepAlive) this.cache = [];
    }
}