<template>
  <v-container
    id="google-maps"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <base-material-card
          color="success"
          title="Satellite Map"
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26356315.701909266!2d-113.65984645545673!3d36.25591957613731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sus!4v1566158729223!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="success"
          title="Satellite Map"
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15831228695!2d-74.11976206978034!3d40.697663747508045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1566158235149!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col>
        <base-material-card
          icon="mdi-clipboard-text"
          title="Simple Table"
          class="px-5 py-3"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th class="primary--text">
                  ID
                </th>
                <th class="primary--text">
                  Name
                </th>
                <th class="primary--text">
                  Country
                </th>
                <th class="primary--text">
                  City
                </th>
                <th class="text-right primary--text">
                  Salary
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Dakota Rice</td>
                <td>Niger</td>
                <td>Oud-Turnhout</td>
                <td class="text-right">
                  $36,738
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Minverva Hooper</td>
                <td>Curaçao</td>
                <td>Sinaas-Waas</td>
                <td class="text-right">
                  $23,789
                </td>
              </tr>

              <tr>
                <td>3</td>
                <td>Sage Rodriguez</td>
                <td>Netherlands</td>
                <td>Baileux</td>
                <td class="text-right">
                  $56,142
                </td>
              </tr>

              <tr>
                <td>4</td>
                <td>Philip Chaney</td>
                <td>Korea, South</td>
                <td>Overland Park</td>
                <td class="text-right">
                  $38,735
                </td>
              </tr>

              <tr>
                <td>5</td>
                <td>Doris Greene</td>
                <td>Malawi</td>
                <td>Feldkirchen in Kärnten</td>
                <td class="text-right">
                  $63,542
                </td>
              </tr>

              <tr>
                <td>6</td>
                <td>Mason Porter</td>
                <td>Chile</td>
                <td>Gloucester</td>
                <td class="text-right">
                  $78,615
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="success"
          title="Custom Skin & Settings Map"
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15831228695!2d-74.11976206978034!3d40.697663747508045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1566158235149!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
