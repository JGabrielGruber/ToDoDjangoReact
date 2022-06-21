# ToDo Django React

To Do app created with Django and React

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. 

### Prerequisites

Requirements for the software and other tools to build and test 
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Nodejs](https://nodejs.org/en/)

### Installing

Inside a terminal, clone the repository and access it's folder:
```bash
git clone https://github.com/JGabrielGruber/ToDoDjangoReact.git && cd ToDoDjangoReact
```
#### NodeJS workaround

Currently, some development dependencies aren't being installed on the **React APP container**, to solve this, you'll need to manually install them on the **app** folder, using the following command:
```bash
cd app && npm install -D && cd ..
```

## Running locally

### Starting the containers

Inside the **ToDoDjangoReact** folder, run the following command to start the containers:
```bash
docker-compose up
```

This will build and run four containers:
- **api**
  - which will be running our Django API
- **app**
  - responsible for our React APP
- **db**
  - the Postgres database used by our api
- **nginx**
  - a proxy that'll centralize our access to the application

### Migrating the database

*FIRST TIME ONLY*

It's fundamental to the Django API that you migrate it's database schema the first time you run the application, for that, we'll run a command inside the **Django API container**:
```bash
docker exec -it api python manage.py migrate
```

### Testing the APP

You can check if the React APP is running, open the following link in your browser: http://localhost:3000

### Testing the API

If you want to see the Django API magic, you can use the same link, but with the /api path, for example, to list the todos: http://localhost:3000/api/todos


## Authors

  - **José Gabriel Gruber**


## License

This project is licensed under the [AGPL-3.0 license ](LICENSE.md)
- see the [LICENSE.md](LICENSE.md) file for
details

## Acknowledgments

  - https://www.django-rest-framework.org/
  - https://mui.com/
  - https://recoiljs.org/
  - https://reactrouterdotcom.fly.dev/docs/en/v6
  - https://www.axios.com/
  - https://nginx.org/en/
