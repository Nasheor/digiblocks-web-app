import BuildingCard from '../../sections/BuildingCard/index'
import BCard from '../../widgets/BuildingCardComponents/index'
import CompareView from '../../widgets/CompareView/index'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            name: '', 
            buildings: [ {
                    'name': "Cork Institute of Technology",
                    'src': "cit.jpg"
                },
                {
                    'name': "Nimbus Research Center",
                    'src': "nimbus.jpg"                    
                }]
        }
    },
    components: {
        BuildingCard,
        CompareView,
        BCard,
    },
    computed: {
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings']),
    },
    methods: {
        open() {
            if(this.getCompareBuildings.length>1) {
                this.$store.commit("statusCompareDialog", true);
            } else {
                alert("You need to select atleast two buildings to compare");
                this.$store.commit("statusCompareDialog", false);
                location.reload();
            }
        },
        setName() {
            console.log("name is et");
        }
    }
}