class GroupsController < ApplicationController
  def index
    @groups = Group.all
  end

  def show
		if Group.find(params[:id]).users.include?(current_user)
      Group.find(params[:id])
    else
      flash[:notice] = "You are not part of this group."
      redirect_to :controller=>'users', :action=> 'show', :id => current_user.id
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    flash[:notice] = "Successfully deleted group!"
    redirect_to user_path
  end
end
