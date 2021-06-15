import DeviceCard from '../../sections/DeviceCard/index'
import DeviceModal from './DeviceModal/index'
import  { mapGetters } from 'vuex'

export default {
    components: {
        DeviceCard,
        DeviceModal,
    },
    data() {
        return  {
            dialog: false,
            name: "",
            device_data: "",
            src: "sensor.png"
        };
    },
    methods: {
        setData(device) {
            console.log(device)
            this.name = device.name + "" + device.data[4].value
            this.device_data = device.data
        }
    },
    computed: {
        ...mapGetters({ devices: "getTenantDevices"}),
        getName() {
            return this.name
        },
        getData() {
            return this.device_data
        }
    }
}