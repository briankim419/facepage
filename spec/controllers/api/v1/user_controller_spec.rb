require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:first_post) { User.create(first_name: "Patrick", last_name: "Bot", email: "patrick@gmail.com", password: "password") }
  let!(:second_post) { User.create(first_name: "Spongebob", last_name: "Bot", email: "spongebob@gmail.com", password: "password") }
  user = FactoryBot.create(:user)

  describe "GET#index" do
    it "should return a list of all the users" do
      sign_in user

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end
  end

  describe "POST#create" do
    it "creates a new user" do
    prev_count = User.count
    User.create(first_name: "Example", last_name: "Bot", email: "example@gmail.com", password: "password")
    expect(User.count).to eq(prev_count + 1)
    end
  end
end
