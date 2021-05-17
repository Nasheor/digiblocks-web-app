import TimeSeries from './TimeSeries/index'
import BarGraph from './BarGraph/index'
import LineMetrics from './LineMetrics/index'
import BarMetrics from './BarMetrics/index'
import MetricsTable from './MetricsTable/index'
import PieChart from './Piechart/index'
import Timeline from './Timeline/index'
import Profile from './Profile/index'
import XLSX from 'xlsx'

export default {
    props: [
        "name",
        "building",
    ],
    data() {
        return {
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
        getDltStatus() {
            return this.building.dlt_status;
        },
        getBuilding() {
            return this.building
        }
    },
    methods: {
        filePicked(file) {
            const reader = new FileReader()
            if(typeof file !== 'undefined') {
                reader.readAsBinaryString(file)
                reader.onloadend = async (e) => {
                    let workbook = XLSX.read(e.target.result, {
                        type: 'binary'
                    })
                    let sheet = workbook.SheetNames[0]
                    let json_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                    console.log(json_data)
                }
            }
        },
        async submit(){

        },
        async convertToBuffer(reader) {
            return Buffer.from(reader);
        },
    }
}
