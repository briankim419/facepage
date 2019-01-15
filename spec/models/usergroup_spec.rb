require 'rails_helper'

RSpec.describe Usergroup, type: :model do
  let(:user) { User.create(first_name: "Brian", last_name: "Kim", email: "bk@gmail.com", password: "password") }
  let(:group) { Group.create(name: "Group Name Test") }

  it { should have_valid(:user).when(user) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_valid(:group).when(group) }
  it { should_not have_valid(:group).when(nil) }
end
