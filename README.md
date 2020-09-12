# Event Point

An event tracker for Evident Point to assist with scheduling internal meetings and events.

## Prerequisites

- Ruby 2.6.6
- Rails 6+

## Configuration

Steps to follow to get up and running with this project:

### 1. Clone the repo

```bash
git clone https://github.com/Ilya-Meer/event-point.git
```

### 2. Install dependencies

```bash
bundle install # Install Rails and other Ruby gems
yarn install # Install npm packages necessary for client-side development
```

### 3. Create database.yml file

Copy the `sample-database.yml` file and edit the database configuration as required.

```bash
cp config/sample-database.yml config/database.yml
```

### 4. Create the database

```bash
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed # optional
```

### 5. Start the server

```bash
bundle exec rails s
```

After completing the above, you should be able to access the app on `http://localhost:3000`.

## CSS

This project currently uses the out-of-the-box SCSS that comes with Rails. But this is only because this project was meant to be a proof of concept. In the event that more resources are directed to this, any more suitable solution can be used instead.

## Testing

Test scripts for both server and client side test suites can be found in `package.json` at project root.

Client-side testing is done with [Jest](https://www.npmjs.com/package/jest) and [`@testing-library/react`](https://www.npmjs.com/package/@testing-library/react).

Server-side testing is done with...Rails, of course!

## Contributing

New issues and PRs are always welcome!
