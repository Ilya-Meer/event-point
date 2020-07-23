class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :event

  # Validations
  validates_presence_of :user_id
  validates_presence_of :event_id
end
