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
  email = Faker::Internet.email
  password = Faker::Internet.password

  User.create(email: email, password: password, password_confirmation: password, display_name: display_name)
end

# Seed db with Events
5.times do
  topic = Faker::Lorem.word
  description = Faker::Lorem.sentence

  user_ids = User.pluck(:id)
  user_id = rand(user_ids.min..user_ids.max)

  Event.create(
    topic: topic,
    description: description,
    datetime: DateTime.new(2021,2,3,4,5,6),
    owner_id: user_id
  )
end
