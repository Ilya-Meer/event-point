require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup do 
    @topic = "Lorem"
    @description = "Ipsum"
    @owner_id = User.first.id
  end

  test "saves correctly if required fields provided" do
    event = Event.new(topic: @topic, description: @description, owner_id: @owner_id)
    assert event.save

    assert_equal(event.topic, @topic)
    assert_equal(event.description, @description)
    assert_equal(event.owner_id, @owner_id)
  end

  test "does not save if required fields not provided" do
    event = Event.new(description: @description, owner_id: @owner_id)
    assert_not event.save

    event = Event.new(topic: @topic, description: @description)
    assert_not event.save
  end
end
