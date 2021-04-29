# Guideline for candidate
Candidate has to create a simple CLIENT application for showing the list of vehicle cards in a page and interacting with each of them to proof his/her programming skills.

## Game Rules
In order to maintain things simple, the application can be written using VueJS and following OOP approach for the business logic.

The application has to be stable.

No skeleton is provided. Developer can provide any solution to proof his/her skills.

### Requirements
- Each vehicle has an image, make, model, version, price, registration year, isKm0, consumption.
- UI should reflect the one provided in Figma

#### UI
- [https://www.figma.com/file/CNGGLuh2C3TdMtAOaymUh2/Frontend-Interview](https://www.figma.com/file/CNGGLuh2C3TdMtAOaymUh2/Frontend-Interview)

#### API JSON
- [https://drive.google.com/file/d/1_-Mj-jbpo3nFi1Nhb22T7ZT-IMzvuIZ0/view?usp=sharing](https://drive.google.com/file/d/1_-Mj-jbpo3nFi1Nhb22T7ZT-IMzvuIZ0/view?usp=sharing)
- [https://jsonkeeper.com/b/S3US](https://jsonkeeper.com/b/S3US)

### Scenario
- Given a mocked API response for the vehicles, then show the list of vehicle cards
- Given any vehicle, when a user clicks on the hearth icon, then the heart becomes orange and the client should save it.
- Given a refresh of the page, then likes shouldn't be lost.
- Given a filter section, when a user clicks on the KM button, all the values depending on km are converted into KM
- Given a filter section, when a user clicks on the Miles button, all the values depending on miles are converted into MILES
- Given a filter section, when a user types in the search filter, then the vehicles should be filtered by make, model and version.
- Given a not FREE vehicle, when a user clicks on the HEART icon, nothing should happen and the like action is disabled
- Given any error that could occur in the interaction with the API, then the client should handle it in order to avoid any application breaking point

## Expectations
The expectations are:

- Modelling needed domain entities
- Writing tests!
- Handling errors
- The application should have a state/storage layer for managing received data from API
- API response can be mocked but easily switchable to a real API.
