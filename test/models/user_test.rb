require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @email = "sample_email@email.com"
    @password = "text"
  end

  test "saves correctly if required fields provided" do
    user = User.new(
      email: @email,
      password: @password,
      password_confirmation: @password
    )

    assert user.save

    assert_equal(user.email, @email)
  end

  test "does not save if required fields not provided" do
    user = User.new(
      password: @password,
      password_confirmation: @password
    )

    assert_not user.save

    user = User.new(
      email: @email,
      password: @password
    )

    assert_not user.save

    user = User.new(
      email: @email,
      password_confirmation: @password
    )

    assert_not user.save
  end
end



# require 'test_helper'

# class EventTest < ActiveSupport::TestCase
#   setup do 
#     @topic = "Lorem"
#     @description = "Ipsum"
#     @owner_id = 1
#   end

#   test "saves correctly if required fields provided" do
#     event = Event.new(topic: @topic, description: @description, owner_id: @owner_id)
#     assert event.save

#     assert_equal(event.topic, @topic)
#     assert_equal(event.description, @description)
#     assert_equal(event.owner_id, @owner_id)
#   end

#   test "does not save if required fields not provided" do
#     event = Event.new(description: @description, owner_id: @owner_id)
#     assert_not event.save

#     event = Event.new(topic: @topic, description: @description)
#     assert_not event.save
#   end
# end
