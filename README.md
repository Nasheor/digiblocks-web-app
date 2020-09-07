# Digiblocks User Interface Documentation

## Tools
1. VueJS - Framework
2. Vuex - Store for client side data
3. Vue Router - Ensures smooth navigation to various components
4. Vuetify - Material UI framework
5. SCSS - Scoped CSS
6. Cypress - End to end testing framework
7. Jest - Ensures correctness of the project codebase
8. i18n - Internationalisation plugin for some localization features
9. NPM - Package Manager
10. Babel- Compiler to ensure backward compatibility
11. ESlint - Code Formatter
12. SASS - Bundles the javascript to ensure fast load in the browser. 

## Brief Overview
The DigiBlocks UI Platform provides a dashboard interface that helps the user view and conduct analysis of the data retrieved from the Thingsboard platform. It primarily consists of five different views which in its own right constitutes a feature of the DigiBlocks dashboard. The dashboard also has an additional view where custom features are implemented. This may include anything from user specific features to permission based access. These are the following views:
1. Login View
2. Register View
3. Community View (Landing Page)
4. Buildings View
5. Certificate View
6. Custom View
We will break down the individual components at a later stage in this document. 

## Technical Overview
The DigiBlocks UI platform is built using the VueJS framework, Vuex for state management and Vuetify for defining the style. In addition to this, custom features such as Graphs, Maps etc have been built with the help of third party libraries from the [npm registry](https://www.npmjs.com/). A list of all the libraries used to build the DigiBlocks UI platform can be found in the package.json file. 

## Architecture
The web application uses the [Vue Material Dashboard master](https://preview.themeforest.net/item/materialpro-vuejs-admin-template/full_screen_preview/26758785) template and hence the foundation of the DigiBlocks web app architecture reuses several components from the above template. It is in your best interest to refer to the above template’s [documentation](https://www.wrappixel.com/demos/vuejs-admin-templates/materialpro-vuetify-admin/docs/documentation.html) while going through this one side by side. As mentioned, in the above template all the custom components that were built to create the above mentioned views are present in the views directory. From an abstract point of view, the application follows the traditional and popular VueJS development architecture - MVVM (Modal View View-Modal). This works very well, especially for an application such as this, where the backend data is already clearly defined on a platform such as Thingsboard and only the data access layer has to be defined in the frontend. This has been achieved with the help of a promise based http client called Axios and loading the retrieved data onto the Vuex store for further processing. This approach makes sure that the data in the web application is consistent throughout the application and in sync with the real time data present on Thingsboard.

### Buildings View
The root file that represents this view is the Buildings component present in the pages directory. This view comprises components that represent the individual buildings in particular. Interacting with this individual building components will display more analytical and graphical information about the building. The behavioral logic for these individual buildings are defined in sections/BuildingCard and widgets/CompareView. CompareView component comprises the logic and visualization tools - Apex Charts needed for comparing the buildings selected by the user.

### Community View 
This view gives a summary of the various assets and building data present in the community which the user has access to. 
This view comprises the following UI components Dashboard.vue present in the views directory and the ApexChart components imported as Javascript library from the Node Package Manager. Data to this view is being  passed from the vuex store which in turn gets its data from Thingsboard via the Thingsboard controller in controller/thingsboardController. The JSON data retrieved from Thingsboard is converted into an array of objects data structure in order to be used with Apex charts.

### Login View
The login component defined in views/pages/Login directory uses the BoxedLogin logic defined in the Material Dashboard template. Refer to the template’s documentation for more information about this view.

### Register View
The register component defined in views/pages/Register directory uses the BoxedRegister logic defined in the Material Dashboard template. Refer to the template’s documentation for more information about this view.

### Certificate View
This component displays the energy certificates of all the buildings present in the community. This comprises two [Modal](https://en.wikipedia.org/wiki/Modal_window)  components views/pages/Certificate/CertificateModal and views/pages/Certificate/CommunityModal. The CertificateModal displays the energy certificate of the building that the user is interested in. The CommunityModal displays the energy certificates of all the buildings present in the community.

### Custom View
This component is not available for access by every user but is tailored according to the permissions that are associated with a user account. The logic for this component is defined in views/pages/CustomView. This gives the admin the privilege to set access permissions to users depending the information that is relevant to the user. 


Commit Code: 0cada41d4ec0691ca69d271d8f837fb90f370234
