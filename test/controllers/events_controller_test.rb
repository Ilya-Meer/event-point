require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event = Event.first
    
    register
  end
  
  test "should get index" do
    get "/api/v1/events"
    assert_response :success

    events = JSON.parse(response.body)
    assert_equal(events.length, 2)
  end

  test "should fail creation with invalid data" do
    post("/api/v1/events", params: { 
      event: {
        description: "Test"
      }
    })

    assert_response :unprocessable_entity
  end

  test "should create events when given valid data" do
    post("/api/v1/events", params: { 
      event: {
        topic: "Test",
        description: "Test",
        owner_id: 1
      }
    })

    assert_response :success
  end

  test "should update events when given valid data" do
    assert_equal(Event.find(1).topic, "MyString")

    patch("/api/v1/events/1", params: { 
      event: {
        topic: "Some other topic",
      }
    })

    assert_response :success

    assert_equal(Event.find(1).topic, "Some other topic")
  end
end
