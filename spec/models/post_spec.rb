require 'rails_helper'

RSpec.describe Post, type: :model do
  it { should have_valid(:body).when("Body Test Post") }
  it { should_not have_valid(:body).when(nil, "") }
end
