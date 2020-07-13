import BuildingCard from '.././../sections/BuildingCard/index.vue'
import CertificateModal from './CertificateModal/index.vue'
import chartData from './energyData.js'

export default {
    data() {
        return {
            dialog: false,
            data: chartData,
            buildings: [ {
                'name': "Cork Institute of Technology",
                'src': "cit.jpg"
            },
            {
                'name': "Nimbus Research Center",
                'src': "nimbus.jpg"                    
            }],
            chart: {

            }
        };
    },
    components: {
        BuildingCard,
        CertificateModal,
    },
    methods: {

    }
}