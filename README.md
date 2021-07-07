<p align="center"><img alt="Icon" height="128" src="https://github.com/mateuszaliyev/skyclouds/blob/main/public/logo.svg" width="128"></p>
<h1 align="center">Skyclouds</h1>

Small [React.js](https://reactjs.org/) application build with [Next.js](https://nextjs.org/) framework and written in [TypeScript](https://www.typescriptlang.org/). Allows user to check current weather as well as weather forecasts for any of the observed cities.

### Installation

Installing dependencies after cloning the repository is necessary for the application to run properly.

```bash
npm install

# or

npm i
```

### Environment Variables

Application requires a variable `OPEN_WEATHER_MAP_API_KEY` to be declared inside `.env.local` file inside of the root folder in order to get access to [OpenWeather](https://openweathermap.org/) API. Example of `.env.local` file content.
> Note: File `.env.local` does not exist in the repository and must be created.

```
OPEN_WEATHER_MAP_API_KEY=70f08cabc0a90f09c0d98f0a2092c0af
```

### Running application

Completion of the steps above should be enough to make the application work properly. It is possible to run the application in either development or production mode. Building the project is neccessary for production start-up to succeed.

```bash
npm run dev     # development
npm run build   # build
npm run start   # production
```

### Credentials
After running the application and visiting the server url ([http://localhost:3000](http://localhost:3000) by default) the user will be greeted with a login form (if everything has been done correctly). The only credentials that will be accepted by the application can be found in the table below.

| Username | Password |
| ---------|----------|
| `admin`  | `admin`  |
