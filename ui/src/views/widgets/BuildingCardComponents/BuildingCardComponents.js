import TimeSeries from './TimeSeries/index'
import BarGraph from './BarGraph/index'
import LineMetrics from './LineMetrics/index'
import BarMetrics from './BarMetrics/index'
import MetricsTable from './MetricsTable/index'
import PieChart from './Piechart/index'
import Timeline from './Timeline/index'
import Profile from './Profile/index'
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'

export default {
    props: [
        "name",
        "building",
    ],
    data() {
        return {
            dlt_status: false,
            register_building: false,
        };
    },
    components: {
        TimeSeries,
        BarGraph,
        LineMetrics,
        BarMetrics,
        MetricsTable,
        PieChart,
        MetricsTable,
        PieChart,
        Timeline,
        Profile,
    },
    // "getBuildingData"
    computed: {
        ...mapGetters({ devices: "getTenantDeviceNames"}),
        ...mapGetters({ device_data: "getTenantDevices"}),
        ...mapGetters(["getRole", "getDltStatus", ]),
        getDltStatus() {
            return this.building.dlt_status;
        },
        getBuilding() {
            return this.building
        },
        getFileColumns() {
            return this.file_columns
        },
        getTimestamp() {
            return this.timestamp
        }
    },
    methods: {
        async registerBuilding() {
            console.log(this.building)
            if(this.building.dlt_status === true) {
                confirm("Building already registered to the ledger!")
                return 
            }
      
            let status = "Approved"
            this.$store.dispatch("REGISTER_ASSET", {
                "fcn": "createAsset",
                "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
                "chaincodeName":"identitycontract",
                "channelName" : "mychannel",
                "args": [this.building.id, this.building.category, status, `{\"environment\": \"${this.building.environment}\",\"name\": \"${this.building.name}\",\"main_fuel\": \"${this.building.fuel}\"}`
                ]
            }).then(result => {
                console.log(result)
            })
            let payload = {
                "body": {
                    "dlt_status": true
                },
                "id": this.building.id
            }
            console.log(this.building)
            this.$store.dispatch("UPDATE_ASSET_STATUS", {"body": payload.body, "id": payload.id})
            confirm("Ledger Registration ID: "+this.building.id+".")
            this.building.dlt_status = true
        }
    },
}
