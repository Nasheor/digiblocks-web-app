<template>
     <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Energy Certificate</v-toolbar-title>
        </v-toolbar>
                    <base-material-stats-card
                color="success"
                icon="mdi-store"
                title="Band"
                value="B1"
                sub-icon="mdi-calendar"
                sub-text="149.1 kwH"
            />
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <div>
                <vue-apex-charts
                type="bar"
                height="350"
                :options="chartData.chartOptions"
                :series="chartData.series"
              ></vue-apex-charts>
            </div>
        </div>
    </v-card>   
</template>

<script src="./CertificateModal.js" />
<style scoped lang="scss" src="./CertificateModal.scss" />