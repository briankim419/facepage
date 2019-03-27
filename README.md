# FacePage

#### https://facepage-heroku.herokuapp.com/
<br />
FacePage is my first application built after Launch Academy. It is a Ruby on Rails app with a React.js front-end. It has many basic features of Facebook and more features will be added in the future. The highlight of the application is the chat system built through ActionCable. Users can create chatrooms with their followers and have a conversation. FacePage utilizes many dependencies such as ActionCable, React Dropzone, Carrierwave, Devise and Foundation. The app uses Ruby version 2.3.3 and React 15.4.2 .

### Getting Started

1. Clone the repository to your machine

2. Navigate to the cloned repository

3. Run the following from the command line to install all necessary dependencies:

  `$ bundle install`
  `$ yarn install`

4. Create the database and run migrations

  `$ bundle exec rake db:create`
  `$ bundle exec rake db:migrate`

5. Start the rails server and webpack server

  `$ rails s`
  `$ yarn start`

6. Navigate to localhost:3000 in your web browser. Google Chrome is recommended.

Test Suite
To run RSpec test, please run from the command line:

`$ bundle exec rspec`

The test suite consists of Model and Controller tests and Enzyme feature tests.

### Future Plans
* More tests will be coming out
* Implement a scalable way to build schedules
 https://docs.google.com/presentation/d/1jSWS4elcnfSC0O4BTkVl3jHgd_9TTZb77t-FIbAORYw/edit#slide=id.g5440368a33_0_37 - Google Slides for Relational Diagrams and more
-
