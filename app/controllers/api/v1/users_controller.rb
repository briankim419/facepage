class Api::V1::UsersController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	# before_action :authenticate_user!, except: [:index, :show]

	def index
		render json: {users: User.all, current_user_id: current_user.id}
	end

	def show
		render json: User.find(params[:id])
	end

	def create
		follow = Follow.new
		follow.followed = User.find(followed_params)
		follow.follower = current_user
		if follow.followed != follow.follower
			follow.save
			user = User.find(followed_params)
			render json: {followed: user.followeds, followers: user.followers}
		end
	end

	def destroy
		follow = Follow.find_by(follower: current_user, followed: User.find(delete_params))
		follow.destroy

		user = User.find(delete_params)
		render json: {followed: user.followeds, followers: user.followers}
	end

	private
	def serialize_array(data, serializer)
		ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: serializer)
	end

	def followed_params
		params.require(:followedId)
	end

	def delete_params
		params.require(:id)
	end
end
