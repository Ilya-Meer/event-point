require 'test_helper'

class VoteTest < ActiveSupport::TestCase
  setup do 
    @event_id = Event.first.id
    @user_id = User.first.id
  end

  test "saves correctly if required fields provided" do
    vote = Vote.new(event_id: @event_id, user_id: @user_id)
    assert vote.save

    assert_equal(vote.event_id, @event_id)
    assert_equal(vote.user_id, @user_id)
  end

  test "does not save if required fields not provided" do
    vote = Vote.new(user_id: @user_id)
    assert_not vote.save

    vote = Vote.new(event_id: @event_id)
    assert_not vote.save
  end
end
