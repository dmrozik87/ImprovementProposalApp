# Improvement Proposal Application


## Project Description

"Improvement Proposal" is an application intended for companies, enterprises, factories, etc. that would like to enable employees to submit various types of improvement proposals in an organized way. It allows employees to submit suggestions for improvements and have them assessed by reviewers.

It is a training project created to practice Spring Boot, Spring Data, React and learn about Dockerization and Bootstrap.

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
- Docker
- Bootstrap
- Day.js

## Screenshots

#### Improvement Proposal view with comments:

![IP view with comments](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/e596e3b0-3b95-420b-9b4f-85808e77f4d1)

#### Submitter Dashboard:

![Submitter Dashboard](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/75ac0c4b-ba86-4304-940b-14a71f969492)

#### Reviewer Dashboard:

![Reviewer Dashboard](https://github.com/dmrozik87/ImprovementProposalApp/assets/116550191/796dc353-f43b-4438-a2b9-1fc29babb12d)


## Running the Project

To run the project, follow these steps:

1. Clone the project repository to your computer:

```
git clone https://github.com/dmrozik87/ImprovementProposalApp.git
```    
2. Make sure that Docker is running
3. Open a command-line interface (e.g. Windows PowerShell, Git Bash e.t.c.) and navigate to the repository
4. Use the command below to pull all dependencies, build images and run containers:
```
docker compose up
```
Once completed, you will be able to connect to localhost in your browser and see the login screen. However, you will not be able to log in because the database in the container does not contain any users. Follow the steps below to add users.

5. Enter a running container with PostgreSQL database:
```
docker exec -it improvementproposalapp-postgres-db-1 bash
```

6. Enter database:
```
psql --dbname improvement_proposal_db --username postgres
```

7. Add a submitter and a reviewer:
```
INSERT INTO users (username, password, role) VALUES ('Submitter1', 'Submitter1', 'SUBMITTER'), ('Reviewer1', 'Reviewer1', 'REVIEWER');

```

I recommend adding at least one submitter and one reviewer (but preferably two of each type) to test the application for each role.

8. Now you can log in to the application using the credentials you created
