ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: 1)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def register
    post("/api/v1/registrations", params: { 
      user: {
        email: "new_email@test.com",
        password: "a",
        password_confirmation: "a" 
      }
    })
  end
end
