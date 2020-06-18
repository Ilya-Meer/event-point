# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# Seed db with Users
5.times do
  display_name = Faker::Name.first_name
  User.create(display_name: display_name)
end

# Seed db with Events
Event.create(
    topic: "Docker",
    description: "A primer on how to get up and running with Docker",
    datetime: DateTime.new(2021,2,3,4,5,6)
)