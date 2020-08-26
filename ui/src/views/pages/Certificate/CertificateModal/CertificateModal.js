import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'

export default {
    props: {
        chartData: Object,
        id: String,
    },
    components: {
        VueApexCharts,
    },
    data() {
        return {
            certificate_keys: [],
            certificate_data: {},
        };
    },
    methods: {
          populateData() {
                this.building_data[0].certificate_keys.map(key => {
                    this.certificate_keys.push({"text": key.toUpperCase(), "value": key})
                })
                this.building_data.map(building => {
                    if(building.id === this.id) {
                        this.certificate_keys.map(item => {
                            Object.assign(this.certificate_data, {[item.value]: building[item.value]})
                        })
                    }
                })
          },
    },
    computed:{ 
        ...mapGetters({ building_data: "getBuildingData" })
    },
    mounted() {
        this.populateData(); 
    }
}