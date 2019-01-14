class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.belongs_to :follower
      t.belongs_to :followed

      t.timestamps null: false
    end
  end
end
