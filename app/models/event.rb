class Event < ApplicationRecord
    has_many :votes, dependent: :destroy
end
