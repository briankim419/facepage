require "rails_helper"

RSpec.describe Api::V1::PostsController, type: :controller do
  let!(:first_post) { Post.create(body: "Test Post 1") }
  let!(:second_post) { Post.create(body: "Test Post 2") }

  describe "GET#index" do
    it "should return a list of all the posts" do

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["posts"].length).to eq 2
      expect(returned_json["posts"][0]["body"]).to eq "Test Post 1"
      expect(returned_json["posts"][1]["body"]).to eq "Test Post 2"
    end
  end
  
  describe "POST#create" do
    it "creates a new post" do
    prev_count = Post.count
    post :create, params: { body: 'Test' }, format: :json
    expect(Post.count).to eq(prev_count + 1)
    end
  end

end
