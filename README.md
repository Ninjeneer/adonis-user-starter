# Adonis User Starter

Adonis User Start is project starter including user management, allowing to reduce development time of user-based servers.

Pull Requests are **accepted**, feel free to contribute

## Installation

Clone this repository
```
git clone git@github.com:Ninjeneer/adonis-user-starter
```

Install node modules
```
npm install
```
By default, AdonisUserStarter include a Postgresql driver. Feel free to select your own database driver.

Update databases env values
```
cp .env.example .env
```
```
DB_CONNECTION=your_driver
PG_HOST=your_host
PG_PORT=your_port
PG_USER=your_db_user
PG_PASSWORD=your_password
PG_DB_NAME=your_db_name
```

## Make sure everything works
Start the server
```
npm run dev
```

Run the tests
```
npm run tests
```

