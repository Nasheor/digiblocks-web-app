 <template>
    <v-container fluid dark class="mx-auto mt-0"> 
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
          <v-dialog v-model="dialog" persistent max-width="650" transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <DeviceCard 
                    v-for="device of devices"
                    :key="device.name"
                    class="ma-3 pa-2"
                    :name="device.name"
                    :src="src"
                    @click.native="setData(device)"
                    outlined
                    tile
                  />                    
                </div>
              </template>
              <v-card >
                <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ getName }}</v-toolbar-title>
                </v-toolbar>
                  <DeviceModal 
                    :device_data="getData"
                  />
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
 </template>
 
 <script src='./Devices.js' />
 <style scoped lang="scss" src="./Devices.scss"></style>