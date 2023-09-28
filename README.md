# Improvement Proposal Application


## Project Description

"Improvement Proposal" is an application intended for companies, enterprises, factories, etc. that would like to enable employees to submit various types of improvement proposals in an organized way. It allows employees to submit suggestions for improvements and have them assessed by reviewers.

It is a training project created to practice Spring Boot, Spring Data, React and learn about Bootstrap.

## Features

- Application has 2 types of users: Submitters and Reviewers
- Improvement Proposals are created by Submitters and then evaluated by Reviewers
- Improvement Proposals may be at different stages: pending submission, submitted, in review, needs update, resubmitted, completed, rejected
- Submitters and Reviewers have their own Dashboards where they can view Improvement Proposals divided into sections depending on the status
- Submitters and Reviewers can communicate through built-in comments section

## Technologies
- Spring Boot
- Spring Data
- PostgreSQL
- React
- Bootstrap
- Day.js

## Screenshots

#### Improvement Proposal view with comments:

![IP view with comments](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/eae35b88-1528-49a1-90c2-78b901d0b830)

#### Submitter Dashboard:

![Submitter Dashboard](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/98d9bf34-7ae1-4d22-9f29-93c699ba12cf)

#### Reviewer Dashboard:

![Reviewer Dashboard](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/996a3743-2c91-42bd-9528-47b8aae7f323)



## Running the Project

To run the project, follow these steps:

**Clone the Repository**: Clone the project repository to your computer:

```
git clone https://github.com/dmrozik87/ImprovementProposalApp.git
```    

### Frontend

1. Navigate to 'frontend' folder.
2. Install all required dependencies to run the project. You can use npm:

```
npm install
```

3. Run the frontend application:

```
npm start
```

### Backend

1. Configure database connecti0n of your liking in backend/src/main/resources/application.properties
2. Run backend/src/main/java/com/dominikmrozik/ImprovementProposalApp/ImprovementProposalApplication.java
