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

  test "should schedule an event" do
    assert_equal(Event.find(1).datetime.to_s, "2020-06-18 16:41:12 UTC")

    patch("/api/v1/schedule_event", params: { 
      "event_id": 1,
      "datetime": "1999-08-19T16:45:59.214Z"
    })

    assert_response :success

    assert_equal(Event.find(1).datetime.to_s, "1999-08-19 16:45:59 UTC")
  end

  test "should unschedule an event" do
    assert_equal(Event.find(1).datetime.to_s, "2020-06-18 16:41:12 UTC")

    patch("/api/v1/unschedule_event", params: { 
      "event_id": 1
    })

    assert_response :success

    assert_nil(Event.find(1).datetime)
  end

  test "should only return events that are scheduled" do
    patch("/api/v1/schedule_event", params: { 
      "event_id": 1,
      "datetime": "1999-08-19T7:00:00.000Z"
    })
    
    patch("/api/v1/unschedule_event", params: { 
      "event_id": 2
    })

    get("/api/v1/schedule")

    schedule = JSON.parse(response.body)

    assert_equal(schedule.length, 1)
    assert_equal(schedule.first["datetime"], "1999-08-19T07:00:00.000Z")
  end
end
