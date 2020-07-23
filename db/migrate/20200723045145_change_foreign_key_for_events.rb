class ChangeForeignKeyForEvents < ActiveRecord::Migration[6.0]
  def change
    rename_column :events, :user_id, :owner_id
  end
end
