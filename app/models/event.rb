class Event < ApplicationRecord
    has_many :votes, dependent: :destroy

    # Validations
    validates_presence_of :topic
    validates_presence_of :owner_id
end
