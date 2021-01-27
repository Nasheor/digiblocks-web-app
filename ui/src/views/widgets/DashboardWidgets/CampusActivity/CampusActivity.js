import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            activity_data: [],
            url: 'https://api.openweathermap.org/data/2.5/weather',
            temperature: ''
        }
    },
    methods: { 
        populateActivity() {
            this.building_data.map(building => {
                this.activity_data.push(Object.assign({}, {"name": building.name, 
                                        "image": building.image
                                        }, building.activity[0]))
            })
        },
        getWeatherData() {
            axios.get(this.url, {
                params: {
                    q: 'Cork',
                    units: 'imperial',
                    appid: '84bcd2b2e0f26024208a466d06d4a5ef'
                  }
                })
                .then(response => {
                  console.log(response.data);
                  this.temperature = response.data
                  this.temperature.weather[0].description = this.temperature.weather[0].description.toUpperCase()
                })
                .catch(error => {
                  console.log(error);
                  this.errored = true;
                })
                .finally(() => (this.loading = false));
        }
    },
    computed: {
        ...mapGetters({building_data: "getBuildingData"}),
        ...mapGetters({dashboard_data: "getDashboardData"})
    },
    created() {
        this.populateActivity()
        this.getWeatherData()
    }
}