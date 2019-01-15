require 'rails_helper'


RSpec.describe Comment, type: :model do

  it { should have_valid(:text).when("Test Text") }
  it { should_not have_valid(:text).when(nil) }
end
