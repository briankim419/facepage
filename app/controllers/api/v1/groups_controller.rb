class Api::V1::GroupsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!

  def index
    render json: Group.all
  end

  def show
    group = Group.find(params[:id])
    if Group.find(params[:id]).users.include?(current_user)
      render json: group
    else
      render json: "You are not authorized to view this chat."
    end
  end

	def create
    group = Group.new(group_params)
		if group.save
			Usergroup.create(group_id: group.id, user_id: current_user.id)
      Usergroup.create(group_id: group.id, user_id: params[:selected_follower_id])
			render json: {group: group}
		else
			render json: {error: review.errors.full_messages.join(', ') }, status: :unprocessable_entity
		end
	end

  private
  def group_params
    params.permit(:name)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

end
