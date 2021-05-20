import XLSX from 'xlsx'
import { mapGetters } from 'vuex'

export default {
    props: ["device_data"],
    data() {
        return {
            file_processed: false,
            file_columns: [],
            selected_column: {
                timestamp: 2,
                column_id: null,
            },
            timestamp: [],
        };
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
                    let column_names = Object.keys(json_data[0])
                    console.log(Object.keys(json_data[0]))
                    console.log(column_names)
                    this.file_columns = column_names
                    this.timestamp.push(column_names[0])
                    this.timestamp.push(column_names[1])
                    
                }
            }
        },
        async submit(){
            this.file_processed = true
        },
        close() {
            this.file_processed = false
        },
        selectedColumn(column) {
            console.log(column)
        },
        async upload() {
            
        } 
    },
    computed: {
        ...mapGetters({ devices: "getTenantDevices"}),
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
    created() {

    }
}