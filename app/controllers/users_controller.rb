class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
		@users = User.find(params[:id])
  end

  def search
    query = "%#{params[:query]}%"
    @users = User.where('first_name ilike ? or last_name ilike ? or email ilike ?', query, query, query)
  end


  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:notice] = "Successfully deleted user!"
    redirect_to users_path
  end

  def make_admin
    @user = User.find(params[:id])
    @user.update_attribute :role, "admin"
    flash[:notice] = "Successfully made user admin!"
    redirect_to users_path
  end

end
