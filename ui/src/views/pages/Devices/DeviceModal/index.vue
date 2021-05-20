<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TableSimpleDarktheme -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-card-text class="format">
        <v-file-input 
            label="Telemetry File"
            dense
            outlined
            show-size
            @change="filePicked">
        </v-file-input>
        <v-dialog v-model="file_processed" max-width="650" hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <div
            v-on="on"
            class="display ml-12"
            >                        
                <v-btn 
                color="green"  
                @click.native="submit"
                v-on="on"
                >
                Submit
                </v-btn>
        </div>
        </template>
            <v-card v-if="getFileStatus">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-subheader v-text="'Select Data to Upload'"></v-subheader>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                        v-model="selected_column.column_id"
                        :items="getFileColumns"
                        :menu-props="{ maxHeight: '400' }"
                        label="Select"
                        persistent-hint
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-subheader v-text="'Type of Data'"></v-subheader>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="selected_column.type"
                            single-line
                            label="Eg. Gas"
                            persistent-hint
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-subheader v-text="'Select Timestamp'"></v-subheader>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                        v-model="selected_column.timestamp"
                        :items="getTimestamp"
                        :menu-props="{ maxHeight: '400' }"
                        label="Select"
                        persistent-hint
                        ></v-select>
                    </v-col>
                </v-row>
            <v-footer class="d-flex justify-center" padless>
                <v-btn align-center color="success" @click="upload">
                        Upload
                    </v-btn>
                    <v-btn class="ml-2" dark @click="close">
                        Close
                    </v-btn>
            </v-footer>
            </v-card>
        </v-dialog>
        </v-card-text>
        <div>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Value</th>
                    <th class="text-left">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in device_data" :key="device.key">
                    <td>{{ device.key }}</td>
                    <td>{{ device.value }}</td>
                    <td>{{ device.lastUpdateTs }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script src="./DeviceModal.js" />
<style scoped lang="scss" src="./DeviceModal.scss" />