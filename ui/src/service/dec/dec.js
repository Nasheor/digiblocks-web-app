import request from 'request'
import benchmarking from './benchmarking_categories.json'
import energy_factors from './energy_factors.json'
import net_calorific_values from './net_calorific_values.json'
import rating_scales from './rating_scales.json'
import total_useful_floor_area_alternatives from './total_useful_floor_area_alternatives.json'
import weather_observing_stations from './weather_observing_stations.json'

export default class Dec {
    static distance(latitude1, longitude1, latitude2, longitude2) {
        if ((latitude1 === latitude2) && (longitude1 === longitude2)) {
            return 0;
        } else {
            var radLatitude1 = Math.PI * latitude1 / 180;
            var radLatitude2 = Math.PI * latitude2 / 180;
            var dLatitude = radLatitude2 - radLatitude1;
            var dLongitude = Math.PI * (longitude2 - longitude1) / 180;
            var a = Math.sin(dLatitude/2) * Math.sin(dLatitude/2) + Math.cos(radLatitude1) * Math.cos(radLatitude2) * Math.sin(dLongitude/2) * Math.sin(dLongitude/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = 6371000 * c;
            return d;
        }
    }
    
    static get_config_data(file) {
        let data;
        if(file === "benchmarking_categories.json") {
            data = benchmarking;
        } else if(file === "energy_factors.json") {
            data = energy_factors;
        } else if(file === "net_calorific_values.json") {
            data = net_calorific_values
        } else if (file === "rating_scales.json") {
            data = rating_scales;
        } else if(file === "total_useful_floor_area_alternatives.json") {
            data = total_useful_floor_area_alternatives;
        } else if (file === "weather_observing_stations.json") {
            data = weather_observing_stations;
        } else {
            throw Error('Syntax error in configuration file ' + file_name);
        }
        return data;
    }
    
    static async get_weather_monthly_data(url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, function(error, response, body) {
                if (error)
                    reject(error);
                else {
                    try {
                        resolve(response.body);
                    } catch(e) {
                        reject(e);
                    }
                }
            });
        }) 
    }
    
    static async weather(latitude, longitude) {
        var min = Number.MAX_VALUE;
        var name;
        let weatherObservingStations = Dec.get_config_data('weather_observing_stations.json');
        for (let i = 0; i < weatherObservingStations.length; i++) {
            var d = Dec.distance(latitude, longitude, weatherObservingStations[i].latitude, weatherObservingStations[i].longitude);
            if (d < min) {
                min = d;
                name = weatherObservingStations[i].name;
            }
        }
        return (await Dec.get_weather_monthly_data('https://prodapi.metweb.ie/monthly-data/' + encodeURIComponent(name))).mean_temperature;
    }
    
    static async dec(category, environment, latitude, longitude, hours_of_occupancy, total_useful_floor_area, net_lettable_area, sales_floor_area, electricity_energy_use, electricity_energy_units, fossil_thermal_energy_use, fossil_thermal_energy_type, fossil_thermal_energy_units, year) {
        let result = {};
        if (category.length > 0) {
            let benchmarking_categories = Dec.get_config_data('benchmarking_categories.json');
            let benchmarking_category = benchmarking_categories.find(benchmarking_category => benchmarking_category.category === category);
            if (benchmarking_category) {
                result.category = category;
                result.environment = environment;
                result.electricity_typical_benchmark = benchmarking_category.electricity_typical_benchmark;
                result.fossil_thermal_typical_benchmark = benchmarking_category.fossil_thermal_typical_benchmark;
                result.portion_electricity_benchmark_pro_rated_to_degree_days = benchmarking_category.portion_electricity_benchmark_pro_rated_to_degree_days;
                result.portion_fossil_thermal_benchmark_pro_rated_to_degree_days = benchmarking_category.portion_fossil_thermal_benchmark_pro_rated_to_degree_days;
                result.benchmark_hours_per_year = benchmarking_category.benchmark_hours_per_year;
                result.maximum_allowed_hours_per_year = benchmarking_category.maximum_allowed_hours_per_year;
                result.portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year = benchmarking_category.portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year;
                result.portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year = benchmarking_category.portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year;
                if (Math.abs(latitude) <= 90) {
                    if (Math.abs(longitude) <= 180) {
                        let meanTemperatures = await Dec.weather(latitude, longitude);
                        if (meanTemperatures.report) {
                            let meanTemperaturesYear = meanTemperatures.report[year];
                            if (meanTemperaturesYear) {
                                result.degree_days = 0;
                                let january = meanTemperaturesYear['january'];
                                if (january < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - january);
                                let february = meanTemperaturesYear['february'];
                                if (february < 15.5)
                                    result.degree_days = result.degree_days + 28 * (15.5 - february);
                                let mar = meanTemperaturesYear['mar'];
                                if (mar < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - mar);
                                let apr = meanTemperaturesYear['apr'];
                                if (apr < 15.5)
                                    result.degree_days = result.degree_days + 30 * (15.5 - apr);
                                let may = meanTemperaturesYear['may'];
                                if (may < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - may);
                                let june = meanTemperaturesYear['june'];
                                if (june < 15.5)
                                    result.degree_days = result.degree_days + 30 * (15.5 - june);
                                let july = meanTemperaturesYear['july'];
                                if (july < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - july);
                                let august = meanTemperaturesYear['august'];
                                if (august < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - august);
                                let september = meanTemperaturesYear['september'];
                                if (september < 15.5)
                                    result.degree_days = result.degree_days + 30 * (15.5 - september);
                                let october = meanTemperaturesYear['october'];
                                if (october < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - october);
                                let november = meanTemperaturesYear['november'];
                                if (november < 15.5)
                                    result.degree_days = result.degree_days + 30 * (15.5 - november);
                                let december = meanTemperaturesYear['december'];
                                if (december < 15.5)
                                    result.degree_days = result.degree_days + 31 * (15.5 - december);
                                if (benchmarking_category.portion_electricity_benchmark_pro_rated_to_degree_days > 0)
                                    result.electricity_benchmark_degree_day_adjusted = benchmarking_category.electricity_typical_benchmark*(1 - benchmarking_category.portion_electricity_benchmark_pro_rated_to_degree_days) + benchmarking_category.electricity_typical_benchmark*benchmarking_category.portion_electricity_benchmark_pro_rated_to_degree_days*result.degree_days/2021;
                                else
                                    result.electricity_benchmark_degree_day_adjusted = benchmarking_category.electricity_typical_benchmark;
                                if (benchmarking_category.portion_fossil_thermal_benchmark_pro_rated_to_degree_days > 0)
                                    result.fossil_thermal_benchmark_degree_day_adjusted = benchmarking_category.fossil_thermal_typical_benchmark*(1 - benchmarking_category.portion_fossil_thermal_benchmark_pro_rated_to_degree_days) + benchmarking_category.fossil_thermal_typical_benchmark*benchmarking_category.portion_fossil_thermal_benchmark_pro_rated_to_degree_days*result.degree_days/2021;
                                else
                                    result.fossil_thermal_benchmark_degree_day_adjusted = benchmarking_category.fossil_thermal_benchmark;
                            } else
                                throw Error('No weather data');
                        } else
                            throw Error('No weather data');
                    } else
                        throw Error('Invalid longitude');
                } else
                    throw Error('Invalid latitude');
                let electricity_benchmark = result.electricity_benchmark_degree_day_adjusted;
                let fossil_thermal_benchmark = result.fossil_thermal_benchmark_degree_day_adjusted;
                if (hours_of_occupancy > 0) {
                    if (hours_of_occupancy < benchmarking_category.benchmark_hours_per_year)
                        throw Error('Hours of occupancy are less than benchmark hours per year');
                    else {
                        if (hours_of_occupancy > benchmarking_category.maximum_allowed_hours_per_year)
                            throw Error('Hours of occupancy are greater than maximum allowed hours per year');
                        else {
                            result.hours_of_occupancy = hours_of_occupancy;
                            if (benchmarking_category.portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year > 0) {
                                electricity_benchmark = electricity_benchmark*(1 + (hours_of_occupancy - benchmarking_category.benchmark_hours_per_year)/(benchmarking_category.maximum_allowed_hours_per_year - benchmarking_category.benchmark_hours_per_year)*benchmarking_category.portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year);
                                result.electricity_benchmark_degree_day_and_occupancy_adjusted = electricity_benchmark;
                            }
                            if (benchmarking_category.portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year > 0) {
                                fossil_thermal_benchmark = fossil_thermal_benchmark*(1 + (hours_of_occupancy - benchmarking_category.benchmark_hours_per_year)/(benchmarking_category.maximum_allowed_hours_per_year - benchmarking_category.benchmark_hours_per_year)*benchmarking_category.portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year);
                                result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted = fossil_thermal_benchmark;
                            }
                        }
                    }
                }
                let energy_factors = Dec.get_config_data('energy_factors.json');
                let energy_factors_year = energy_factors.find(energy_factors => energy_factors.year === year).factors;
                try {
                    let electricity_factors = energy_factors_year.find(electricity_factors => electricity_factors.fuel === 'Electricity');
                    result.electricity_conversion_factor = electricity_factors.conversion;
                    result.electricity_emissions_factor = electricity_factors.emissions;
                } catch {
                    throw Error('Error in configuration file energy_factors.json');
                }
                result.electricity_benchmark_converted = electricity_benchmark*result.electricity_conversion_factor;
                result.electricity_benchmark_emissions = result.electricity_benchmark_converted*result.electricity_emissions_factor;
                try {
                    let fossil_thermal_factors = energy_factors_year.find(fossil_thermal_factors => fossil_thermal_factors.fuel === fossil_thermal_energy_type);
                    result.fossil_thermal_conversion_factor = fossil_thermal_factors.conversion;
                    result.fossil_thermal_emissions_factor = fossil_thermal_factors.emissions;
                } catch {
                    throw Error('Error in configuration file energy_factors.json or unsupported fossil thermal energy type');
                }
                result.fossil_thermal_benchmark_converted = fossil_thermal_benchmark*result.fossil_thermal_conversion_factor;
                result.fossil_thermal_benchmark_emissions = result.fossil_thermal_benchmark_converted*result.fossil_thermal_emissions_factor;
                if (total_useful_floor_area > 0)
                    result.total_useful_floor_area = total_useful_floor_area;
                else {
                    let total_useful_floor_area_alternatives = Dec.get_config_data('total_useful_floor_area_alternatives.json');
                    let total_useful_floor_area_alternative = total_useful_floor_area_alternatives.find(total_useful_floor_area_alternative => total_useful_floor_area_alternative.category === category);
                    if (total_useful_floor_area_alternative) {
                        switch(total_useful_floor_area_alternative.alternative) {
                            case 'Net lettable area':
                                if (net_lettable_area > 0)
                                    result.total_useful_floor_area = net_lettable_area*total_useful_floor_area_alternative.multiplier;
                                break;
                            case 'Sales floor area':
                                if (sales_floor_area > 0)
                                    result.total_useful_floor_area = sales_floor_area*total_useful_floor_area_alternative.multiplier;
                                break;
                        }
                    }
                }
                if (result.total_useful_floor_area > 0) {
                    if (electricity_energy_use > 0) {
                        if (electricity_energy_units == 'kWh') {
                            result.electricity_energy_use = electricity_energy_use;
                            if (fossil_thermal_energy_use > 0) {
                                if (fossil_thermal_energy_units == 'kWh') {
                                    result.fossil_thermal_energy_use = fossil_thermal_energy_use;
                                } else {
                                    let net_calorific_values = Dec.get_config_data('net_calorific_values.json');
                                    try {
                                        let net_calorific_value = net_calorific_values.find(net_calorific_value => net_calorific_value.fuel === fossil_thermal_energy_type);
                                        if (fossil_thermal_energy_units == net_calorific_value.fuel_unit)
                                            result.fossil_thermal_energy_use = fossil_thermal_energy_use*net_calorific_value.value;
                                        else
                                            throw Error('Unsupported fossil-thermal energy units');
                                    } catch {
                                        throw Error('Error in configuration file net_calorific_values.json or unsupported fossil thermal energy type');
                                    }
                                }
                                result.fossil_thermal_energy_type = fossil_thermal_energy_type;
                                result.electricity_energy_use_per_area = result.electricity_energy_use / result.total_useful_floor_area;
                                result.fossil_thermal_energy_use_per_area = result.fossil_thermal_energy_use / result.total_useful_floor_area;
                                result.total_energy_use_per_area = result.electricity_energy_use_per_area + result.fossil_thermal_energy_use_per_area;
                                result.ber = 100*result.total_energy_use_per_area / (result.electricity_benchmark_converted + result.fossil_thermal_benchmark_converted);
                                result.electricity_energy_use_per_area_emissions = result.electricity_energy_use_per_area*result.electricity_emissions_factor;
                                result.fossil_thermal_energy_use_per_area_emissions = result.fossil_thermal_energy_use_per_area*result.fossil_thermal_emissions_factor;
                                result.total_energy_use_per_area_emissions = result.electricity_energy_use_per_area_emissions + result.fossil_thermal_energy_use_per_area_emissions;
                                result.co2_performance = 100*result.total_energy_use_per_area_emissions/(result.electricity_benchmark_emissions + result.fossil_thermal_benchmark_emissions);
                                let rating_scales = Dec.get_config_data('rating_scales.json');
                                try {
                                    for (var i in rating_scales) {
                                        if (rating_scales[i].min < result.ber)
                                            result.rating_scale = rating_scales[i].band;
                                        else
                                            break;
                                    }
                                } catch {
                                    throw Error('Error in configuration file rating_scales.json');
                                }
                            } else
                                throw Error('fossil-thermal energy use is not specified');
                        } else
                            throw Error('Unsupported electricity energy units: ' + electricity_energy_units);
                    } else
                        throw Error('Electricity energy use is not specified');
                } else
                    throw Error('No total useful floor area or alternative');
            } else
                throw Error('Unsupported category: ' + category);
        } else
            throw Error('Category is not specified');
        let data = await Promise.resolve(result)
        return data;
    }
}