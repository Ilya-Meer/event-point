class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :topic
      t.text :description
      t.integer :votes
      t.datetime :datetime

      t.timestamps
    end
  end
end
