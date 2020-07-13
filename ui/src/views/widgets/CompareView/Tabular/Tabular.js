export default {    
    data() {
        return {
            search: "",
            headers: [
              {
                text: "Energy (100kwH serving)",
                align: "start",
                sortable: false,
                value: "name"
              },
              { text: "Labs", value: "labs" },
              { text: "Devices ", value: "devices" },
              { text: "Equipment (g)", value: "equipment" },
              { text: "Canteen (g)", value: "canteen" },
              { text: "Maintenance (%)", value: "maintenance" }
            ],
            data: [
              {
                name: "Cork Institute of Technology",
                labs: 159,
                equipment: 6.0,
                devices: 24,
                canteen: 4.0,
                maintenance: "10%"
              },
              {
                name: "Nimbus Research Center",
                labs: 237,
                devices: 9.0,
                equipment: 37,
                canteen: 4.3,
                maintenance: "1%"
              },
            ]
        };
      }
};   
