# Better Doctor API
The Better Doctor project dynamically generates a list of all the specialities through the https://developer.betterdoctor.com/documentation15#/ website api. From these list of specialities a user is able to select and find by name &/or speciality. If no results are found they are presented with the option of finding the top 100 doctors in the Portland Area.
## Set-up Installation

First, clone from `https://github.com/neumanna94/BetterDoctor`

```sh
$ npm install
```
then,
```sh
$ npm start run
```
## Known Bugs
Unable to find the website JSON property.
## Support & Contact Details
alexander.daniel.neumann@gmail.com
## Technologies Used
* **npm(node package manager)**
* **Javascript**
* **HTML**
* **CSS**
* **Bootstrap**
* **jQuery**
## Specifications
* **A user should be able to enter a medical issue to receive a list of doctors in the Portland area that fit the search query.**
* **A user should be able to to enter a name to receive a list of doctors in the Portland area that fit the search query.**
* **If the query response includes any doctors, the following information should be included about each doctor: first name, last name, address, phone number, website and whether or not the doctor is accepting new patients (the API provides this data).**
* **If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is.**
* **If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. (This is not an error so it should be handled separately from any errors.)**
## References
* **Favicon Source:**
http://icons.iconarchive.com/icons/icons-land/medical/256/People-Doctor-Male-icon.png
