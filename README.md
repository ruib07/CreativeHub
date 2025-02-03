To run this project, you have to complete the following steps:

- Create a .env file with the database credentials you want and one .env file on the frontend with the api url
- Create a init.sql with the following script:

```sql
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'user') THEN
      CREATE ROLE creativehub WITH LOGIN PASSWORD 'password';
      ALTER ROLE creativehub CREATEDB;
   END IF;
END
$do$;

CREATE DATABASE creativehubdb OWNER user;
```

- Install Docker and run a terminal on the backend folder the following command: docker compose --env-file env/test.env up -d
- Create a user with password and a database on postgres
- Install the postgres extension on VS Code
- Connect to the server where your database is
- Go to services/passwordReset.js and change line 23 to your email
- On the backend file, run the following commands:
  - npm i
  - npm run knex:migrate:test
  - npm run test
  - npm run start:test
- Open a terminal on the react frontend folder and run: npm i and npm start

With this steps, you can have the project on your computer without any problem. Have a great day 😄

Dashboard:
<img width="1702" alt="Dashboard" src="https://github.com/user-attachments/assets/39a38b4a-7b98-4f34-a832-39d1e4556962" />

Projects Page:
<img width="1686" alt="ProjectsPage" src="https://github.com/user-attachments/assets/f5e7d0d9-108e-4bf7-93c3-c3fcea91b88f" />

Project Details:
<img width="1683" alt="ProjectDetailsWLikeAndComment" src="https://github.com/user-attachments/assets/4d0a896a-db3c-4f81-9b38-550ce343f659" />

Create Project:
<img width="1699" alt="CreateProject" src="https://github.com/user-attachments/assets/b37bbde6-7bd7-433c-af22-231445bafb3f" />

Categories Page:
<img width="1683" alt="CategoriesPage" src="https://github.com/user-attachments/assets/a20eec1d-cf53-463f-b314-fca74544d1bc" />

Create Category:
<img width="1700" alt="CreateCategory" src="https://github.com/user-attachments/assets/6d803705-40fe-49dd-82cc-e85164b91804" />

Profile/My Information:
<img width="1695" alt="MyInfo" src="https://github.com/user-attachments/assets/d85b2d06-a37b-4ec8-ae23-cae483bc013b" />

Profile/My Projects:
<img width="1700" alt="MyProjects" src="https://github.com/user-attachments/assets/db5ff7ee-bba1-4b62-9bde-333513315b36" />

Profile/My Comments:
<img width="1700" alt="MyComments" src="https://github.com/user-attachments/assets/52c23f37-a41f-486b-9540-a02f8a0e8d44" />

Edit Project:
<img width="1684" alt="EditProject" src="https://github.com/user-attachments/assets/ec77be39-c71a-42ee-8234-816ee72b670f" />

Profile/My Likes:
<img width="1693" alt="MyLikes" src="https://github.com/user-attachments/assets/1105749f-8372-4b58-8904-f2c0e1f5db0e" />

Profile/Project Stats:
<img width="1695" alt="ProjectStats" src="https://github.com/user-attachments/assets/2ac89d34-cd13-4098-9f41-19826e0458f2" />

Create Account:
<img width="1699" alt="CreateAccount" src="https://github.com/user-attachments/assets/39cc5517-6872-477b-9d42-9e2efec47420" />

Login:
<img width="1696" alt="Login" src="https://github.com/user-attachments/assets/a5a08ac8-0c49-4668-9479-abf3a60c7a08" />

Recover Password/Send Email:
<img width="1699" alt="RecoverPasswordEmail" src="https://github.com/user-attachments/assets/cc517163-4e6e-402d-9074-f83c93224470" />

Recover Password/Change Password:
<img width="1693" alt="ChangePassword" src="https://github.com/user-attachments/assets/f0b0268c-fa59-49a1-93c0-01c47dc194a5" />













