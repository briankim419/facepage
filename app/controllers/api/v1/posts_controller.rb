class Api::V1::PostsController < ApplicationController
  def index
    render json: Post.all
  end

  def new
    post = Post.new
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    post = Post.new(post_params)

    if post.save
      flast[:notice] = 'Post was successfully created'
      redirect_to post
    end
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end
end
