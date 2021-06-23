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
            src: "sensor.png",
            categories: ["All", "Energy Meter", "Water Meter", "Co Meter", "Other"],
            category: "All",
        };
    },
    methods: {
        setData(device) {
            console.log(device)
            this.name = device.name + "" + device.data[4].value
            this.device_data = device.data
        },
        selectedCategory(item) {
            console.log(item)
            this.category = item
            this.$store.commit("setCategorizedDevices", item)
        }
    },
    computed: {
        ...mapGetters({ devices: "getTenantDevices"}),
        ...mapGetters({filtered_devices: "getCategorizedDevices"}),
        getName() {
            return this.name
        },
        getData() {
            return this.device_data
        },
        getCategory() {
            return this.category
        }
    }
}