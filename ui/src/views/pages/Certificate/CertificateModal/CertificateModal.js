import VueApexCharts from 'vue-apexcharts'

export default {
    props: {
        chartData: Object,
    },
    components: {
        VueApexCharts,
    },
    data() {
        return {
            length: 3,
            onboarding: 0,
            keys: ['Name', 'Parent', 'Address', "Type", 
            "Useful Floor Area", "Main Heating Fuel", "Building Environment",
            "BER Number", "Date of Issue", "Valid Until", "Assessor No"],
            data: ["Nimbus", "CIT", "Bishopstown, Cork",
              "University Campus", "3000", "Mains Gas", 
              "Heating and Natural Ventilation", "800570244", "21 Jun 2017", 
              "21 Jun 2018", "104737"],
        };
    },
    methods: {
        next () {
            this.onboarding = this.onboarding + 1 === this.length
              ? 0
              : this.onboarding + 1
              this.populateData();

          },
          prev () {
            this.onboarding = this.onboarding - 1 < 0
              ? this.length - 1
              : this.onboarding - 1
              this.populateData();
          },
          populateData() {
              if(this.onboarding == 0) {
                  this.keys= ['Name', 'Parent', 'Address', "Type", 
                              "Useful Floor Area", "Main Heating Fuel", "Building Environment",
                              "BER Number", "Date of Issue", "Valid Until", "Assessor No"]
                  this.data = ["Nimbus", "CIT", "Bishopstown, Cork",
                                "University Campus", "3000", "Mains Gas", 
                                "Heating and Natural Ventilation", "800570244", "21 Jun 2017", 
                                "21 Jun 2018", "104737"]
              } else if(this.onboarding==1) {
                  this.keys=["Type", "Useful Floor Area", "Main Heating Fuel", "Building Environment"]
                  this.data=["University Campus", "3000", "Mains Gas", "Heating and Natural Ventilation"]
              } else {
                  this.keys=["BER Number", "Date of Issue", "Valid Until", "Assessor No:"]
                  this.data=["800570244", "21 Jun 2017", "21 Jun 2018", "104737"]
              }
          },
          sliceData(start, end) {
              return this.data
          }
    },
    computed:{ 
        updateData() {
            return this.data;
        }
    },
    mounted() {
        this.populateData(); 
    }
}