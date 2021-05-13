import XLSX from 'xlsx'

export default {
    props: ["device_data"],
    data() {
        return {

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
                    console.log(json_data)
                }
            }
        },
        async submit(){

        },
    },
    computed: {

    },
    created() {

    }
}