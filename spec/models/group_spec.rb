require 'rails_helper'

RSpec.describe Group, type: :model do
  it { should have_valid(:name).when("Test Chat Name") }
  it { should_not have_valid(:name).when(nil) }
end
