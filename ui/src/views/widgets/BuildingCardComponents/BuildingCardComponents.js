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
            file_processed: false,
            file_columns: [],
            selected_column: {
                timestamp: 2,
                column_id: null,
                device: "",
                type: "",
            },
            timestamp: [],
            file_data: [],
            energy_type: [
                "Gas",
                "Carbon",
                "Electricity",
                "Water"
            ]
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
    computed: {
        ...mapGetters({ devices: "getTenantDeviceNames"}),
        ...mapGetters({ device_data: "getTenantDevices"}),
        getDltStatus() {
            return this.building.dlt_status;
        },
        getBuilding() {
            return this.building
        },
        getFileStatus() {
            return this.file_processed
        },
        getFileColumns() {
            return this.file_columns
        },
        getTimestamp() {
            return this.timestamp
        }
    },
    methods: {
        filePicked(file) {
            const reader = new FileReader()
            if(typeof file !== 'undefined') {
                reader.readAsArrayBuffer(file)
                reader.onloadend = async (e) => {
                    let workbook = XLSX.read(e.target.result, {
                        type: "array"
                    })
                    let sheet = workbook.SheetNames[0]
                    let json_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                    let column_names = Object.keys(json_data[0])
                    console.log(json_data[0])
                    console.log(column_names)
                    this.file_columns = column_names
                    this.timestamp.push(column_names[0])
                    this.timestamp.push(column_names[1])
                    this.file_data = json_data                   
                }
            }
        },
        async submit(){
            this.file_processed = true
        },
        close() {
            this.file_processed = false
        },
        async upload() {
            let payload = {
                "data": [], 
                "device_id": "",
                "device_name": "",
                "type": this.selected_column.type
            }
            let device = this.device_data.filter(d => d.name === this.selected_column.device )
            payload.device_id = device[0].id
            payload.device_name = device[0].name
            this.file_data.map((item, index) => {
                let date = new Date(item[this.selected_column.timestamp])
                let timestamp = date.getTime()
                let key = "value-"+index
                payload.data.push(
                    JSON.stringify(
                        {
                            "ts": timestamp,
                            "values": {
                                [key]: item[this.selected_column.column_id],
                            }
                        }
                    )
                )
            })  
            this.$store.dispatch("UPLOAD_DATA_FROM_FILE", payload).then(result => {
                console.log(result)
            })

        }
    },
}
