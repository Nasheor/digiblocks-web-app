const fs = require('fs');
const request = require('request');
const yargs = require('yargs');

function distance(latitude1, longitude1, latitude2, longitude2) {
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

function get_config_data(file_name) {
	let file;
	try {
		file = fs.readFileSync(file_name);
	} catch {
		throw Error('No configuration file ' + file_name);
	}
	let data;
	try {
		data = JSON.parse(file);
	} catch {
		throw Error('Syntax error in configuration file ' + file_name);
	}
	return data;
}

const get_weather_monthly_data = (url) => new Promise((resolve, reject) => {
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
});

async function weather(latitude, longitude) {
	var min = Number.MAX_VALUE;
	var name;
	let weatherObservingStations = get_config_data('weather_observing_stations.json');
	for (let i = 0; i < weatherObservingStations.length; i++) {
		var d = distance(latitude, longitude, weatherObservingStations[i].latitude, weatherObservingStations[i].longitude);
		if (d < min) {
			min = d;
			name = weatherObservingStations[i].name;
		}
	}
	return (await get_weather_monthly_data('https://prodapi.metweb.ie/monthly-data/' + encodeURIComponent(name))).mean_temperature;
}

async function dec(category, environment, latitude, longitude, hours_of_occupancy, total_useful_floor_area, net_lettable_area, sales_floor_area, electricity_energy_use, electricity_energy_units, fossil_thermal_energy_use, fossil_thermal_energy_type, fossil_thermal_energy_units, year) {
	let result = {};
	if (category.length > 0) {
		let benchmarking_categories = get_config_data('benchmarking_categories.json');
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
					let meanTemperatures = await weather(latitude, longitude);
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
			let energy_factors = get_config_data('energy_factors.json');
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
				let total_useful_floor_area_alternatives = get_config_data('total_useful_floor_area_alternatives.json');
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
								let net_calorific_values = get_config_data('net_calorific_values.json');
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
							let rating_scales = get_config_data('rating_scales.json');
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
	return result;
}

const argv = yargs
	.option('category', {
		alias: 'cat',
		description: 'Category',
		type: 'string',
	})
	.option('environment', {
		alias: 'env',
		description: 'Environment',
		type: 'string',
	})
	.option('latitude', {
		alias: 'lat',
		description: 'Latitude',
		type: 'number',
	})
	.option('longitude', {
		alias: 'lon',
		description: 'Longitude',
		type: 'number',
	})
	.option('hours_of_occupancy', {
		alias: 'hoc',
		default: 0,
		description: 'Hours of occupancy',
		type: 'number',
	})
	.option('total_useful_floor_area', {
		alias: 'ufa',
		default: 0,
		description: 'Total useful floor area',
		type: 'number',
	})
	.option('sales_floor_area', {
		alias: 'sfa',
		default: 0,
		description: 'Sales floor area',
		type: 'number',
	})
	.option('net_lettable_area', {
		alias: 'nla',
		default: 0,
		description: 'Net lettable area',
		type: 'number',
	})
	.option('electricity_energy_use', {
		alias: 'eus',
		description: 'Electricity energy use',
		type: 'number',
	})
	.option('electricity_energy_units', {
		alias: 'eun',
		default: 'kWh',
		description: 'Electricity energy units',
		type: 'string',
	})
	.option('fossil_thermal_energy_use', {
		alias: 'fus',
		description: 'Fossil-thermal energy use',
		type: 'number',
	})
	.option('fossil_thermal_energy_type', {
		alias: 'fty',
		description: 'Fossil-thermal energy type',
		type: 'string',
	})
	.option('fossil_thermal_energy_units', {
		alias: 'fun',
		default: 'kWh',
		description: 'Fossil-thermal energy units',
		type: 'string',
	})
	.option('year', {
		alias: 'y',
		description: 'Year',
		type: 'number',
	})
    .help()
    .alias('help', 'h')
    .version('1.0')
    .argv;
if (!argv.category) {
	console.log("Category is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.environment) {
	console.log("Environment is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.latitude) {
	console.log("Latitude is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.longitude) {
	console.log("Longitude is not specified");
	yargs.showHelp();
	process.exit();
}
if ((!argv.total_useful_floor_area)) {
	if (!((argv.category == "General office" && argv.net_lettable_area) || ((argv.category == "General retail" || argv.category == "Large non-food shop" || argv.category == "Small food store" || argv.category == "Large food store") && argv.sales_floor_area)))
	console.log("Floor area is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.electricity_energy_use) {
	console.log("Electricity energy use is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.fossil_thermal_energy_use) {
	console.log("Fossil-thermal energy use is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.fossil_thermal_energy_type) {
	console.log("Fossil-thermal energy type is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.fossil_thermal_energy_units) {
	console.log("Fossil-thermal energy units is not specified");
	yargs.showHelp();
	process.exit();
}
if (!argv.year) {
	console.log("Year is not specified");
	yargs.showHelp();
	process.exit();
}
dec(argv.category,
	argv.environment,
	argv.latitude, argv.longitude,
	argv.hours_of_occupancy,
	argv.total_useful_floor_area, argv.net_lettable_area, argv.sales_floor_area,
	argv.electricity_energy_use, argv.electricity_energy_units,
	argv.fossil_thermal_energy_use, argv.fossil_thermal_energy_type, argv.fossil_thermal_energy_units,
	argv.year)
	.then(result => {
		console.log('Category: ' + result.category);
		console.log('Environment: ' + result.environment);
		console.log('\nElectricity typical benchmark: ' + result.electricity_typical_benchmark + ' kWh/m2/yr');
		console.log('Fossil-thermal typical benchmark: ' + result.fossil_thermal_typical_benchmark + ' kWh/m2/yr');
		console.log('\nPortion electricity benchmark pro-rated to degree days: ' + result.portion_electricity_benchmark_pro_rated_to_degree_days);
		console.log('Portion fossil-thermal_benchmark pro-rated to degree days: ' + result.portion_fossil_thermal_benchmark_pro_rated_to_degree_days);
		console.log('Degree days: ' + result.degree_days);
		console.log('Electricity benchmark degree day adjusted: ' + result.electricity_benchmark_degree_day_adjusted + ' kWh/m2/yr');
		console.log('Fossil-thermal benchmark degree day adjusted: ' + result.fossil_thermal_benchmark_degree_day_adjusted + ' kWh/m2/yr');
		console.log('\nBenchmark hours per year: ' + result.benchmark_hours_per_year);
		console.log('Maximum allowed hours per year: ' + result.maximum_allowed_hours_per_year);
		console.log('Portion increase in electricity benchmark at maximum allowed hours per year: ' + result.portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year);
		console.log('Portion increase in fossil-thermal benchmark at maximum allowed hours per year: ' + result.portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year);
		if (result.hours_of_occupancy)
			console.log('Hours of occupancy: ' + result.hours_of_occupancy);
		if (result.electricity_benchmark_degree_day_and_occupancy_adjusted)
			console.log('Electricity benchmark degree day and occupancy adjusted: ' + result.electricity_benchmark_degree_day_and_occupancy_adjusted + ' kWh/m2/yr');
		if (result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted)
			console.log('Fossil-thermal benchmark degree day and occupancy adjusted: ' + result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted + ' kWh/m2/yr');
		console.log('\nElectricity conversion factor: ' + result.electricity_conversion_factor);
		console.log('Electricity benchmark converted: ' + result.electricity_benchmark_converted + ' kWh/m2/yr');
		console.log('Fossil-thermal conversion factor: ' + result.fossil_thermal_conversion_factor);
		console.log('Fossil-thermal benchmark converted: ' + result.fossil_thermal_benchmark_converted + ' kWh/m2/yr');
		console.log('\nElectricity energy use: ' + result.electricity_energy_use + ' kWh/yr');
		console.log('Fossil-thermal energy use: ' + result.fossil_thermal_energy_use + ' kWh/yr');
		console.log('Fossil-thermal energy type: ' + result.fossil_thermal_energy_type);
		console.log('\nElectricity energy use per area: ' + result.electricity_energy_use_per_area + ' kWh/m2/yr');
		console.log('Fossil-thermal energy use per area: ' + result.fossil_thermal_energy_use_per_area + ' kWh/m2/yr');
		console.log('\nTotal energy use per area: ' + result.total_energy_use_per_area + ' kWh/m2/yr');
		console.log('\nBER: ' + result.ber);
		console.log('\nElectricity emissions factor: ' + result.electricity_emissions_factor + ' kg CO₂/kWh');
		console.log('Electricity benchmark emissions: ' + result.electricity_benchmark_emissions + ' kg CO₂/m2/yr');
		console.log('Fossil-thermal emissions factor: ' + result.fossil_thermal_emissions_factor + ' kg CO₂/kWh');
		console.log('Fossil-thermal benchmark emissions: ' + result.fossil_thermal_benchmark_emissions + ' kg CO₂/m2/yr');
		console.log('\nElectricity energy use per area emissions: ' + result.electricity_energy_use_per_area_emissions + ' kg CO₂/m2/yr');
		console.log('Fossil-thermal energy use per area emissions: ' + result.fossil_thermal_energy_use_per_area_emissions + ' kg CO₂/m2/yr');
		console.log('\nTotal energy use per area emissions: ' + result.total_energy_use_per_area_emissions + ' kg CO₂/m2/yr');
		console.log('\nCO₂ performance: ' + result.co2_performance);
		console.log('\nRating scale: ' + result.rating_scale);
	})
	.catch(err => console.error(err));

// node dec.js --cat "University campus" --env "Heating and natural ventilation" --lat 51.88632 --lon -8.53563 --hoc 3500 --ufa 3000 --eus 185250 --fus 262050 --fty "Natural gas" -y 2017
// node dec.js --cat "University campus" --env "Heating and natural ventilation" --lat 51.88632 --lon -8.53563 --hoc 3500 --ufa 3000 --eus 256283 --fus 13051 --fty "Natural gas" --fun "m3" -y 2018