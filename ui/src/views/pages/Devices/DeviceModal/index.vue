<template>
  <v-card class="pt-12">
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
        <v-btn
            min-width="0"
            color="success"
            @click="submit"
        >
            Submit
        </v-btn>
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
  </v-card>
</template>

<script src="./DeviceModal.js" />
<style scoped lang="scss" src="./DeviceModal.scss" />