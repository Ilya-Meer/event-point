require 'test_helper'

class VotesControllerTest < ActionDispatch::IntegrationTest
  test "should add a vote" do
    assert_equal(Event.first.votes.count, 1)
    
    post("/api/v1/add_vote", params: {
      vote: {
        user_id: 2,
        event_id: Event.first.id
      }
    })

    assert_response :success

    assert_equal(Event.first.votes.count, 2)
  end

  test "should remove a vote" do
    assert_equal(Event.first.votes.count, 1)
    
    post("/api/v1/remove_vote", params: {
      user_id: 1,
      event_id: Event.first.id
    })

    assert_response :success

    assert_equal(Event.first.votes.count, 0)
  end
end
