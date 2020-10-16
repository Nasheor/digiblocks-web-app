<template>
        <v-card>
            <v-card-title>
            <span class="headline">Asset Profile</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="asset_name" label="Asset Name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="asset_type" label="Asset Type"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Environment*"
                        v-model="environment"
                        persistent-hint
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm=6>
                    <v-text-field v-model="doi" label="DOI*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm=6>
                    <v-text-field v-model="doe" label="DOE*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="ber" label="BER*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="fuel"
                        label="Main Fuel*"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="assessor"
                        label="Assessor"
                        multiple
                    ></v-text-field>
                </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="success" text @click="register_asset">Save</v-btn>
            </v-card-actions>
        </v-card>
</template>

 <script src='./CertificateForm.js' />
 <style scoped lang="scss" src="./CertificateForm.scss"></style>