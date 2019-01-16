#FacePage

FacePage is my first application built right after graduating from Launch Academy. It is a Ruby on Rails app with a React.js front-end. It has many basic features of Facebook and more features will be added in the future. The highlight of the application is the chat system built through ActionCable. Users can create chatrooms with their followers and have a conversation. FacePage utilizes many dependencies such as ActionCable, React Dropzone, Carrierwave, Devise and Foundation. The app uses Ruby version 2.3.3 and React 15.4.2 .

Getting Started
Clone the repository to your machine

Navigate to the cloned repository

Run the following from the command line to install all necessary dependencies:

$ bundle install
$ yarn install

Create the database and run migrations

$ bundle exec rake db:create
$ bundle exec rake db:migrate

Start the rails server and webpack server

$ rails s
$ yarn start

Navigate to localhost:3000 in your web browser. Google Chrome is recommended.

Test Suite
To run RSpec test, please run from the command line:

$ bundle exec rspec

The test suite consists of Model and Controller tests and Enzyme tests. More test will be added on. 

Future Plans
