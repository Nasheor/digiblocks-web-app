import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
        VueApexCharts,
    },
    props: ["chartData"],
    data() {
        return {
            headers: [
                {
                  text: "Name",
                  align: "start",
                  sortable: false,
                  value: "name"
                },
                { text: "Parent", value: "parent" },
                { text: "Address", value: "address" },
                { text: "Useful Floor Area", value: "ufa" },
                { text: "Main Heating Fuel", value: "mhf" },
                { text: "BER Number", value: "ber" },
                { text: "DOI", value: "doi" },
                { text: "Expiry", value: "expiry" },
                { text: "Assessor", value: "assessor" }
              ],
              buildings: [
                {
                  name: "Cork Institute of Technology",
                  parent: "CIT",
                  address:"Bishopstown, Cork",
                  ufa: 3000,
                  mhf: "Mains Gas",
                  ber: 80570244,
                  doi: "21st June 2017",
                  expiry:  "21st June 2018",
                  assessor: 104737
                },
                {
                    name: "Nimbus Research Center",
                    parent: "CIT",
                    address:"Bishopstown, Cork",
                    ufa: 3000,
                    mhf: "Mains Gas",
                    ber: 80570244,
                    doi: "21st June 2017",
                    expiry:  "21st June 2018",
                    assessor: 104737
                  },
            ]
        };
    },
    methods: {
    }
}