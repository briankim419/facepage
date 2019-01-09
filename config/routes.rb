Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users


  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :comments, only: [:index, :new, :create]
      end
    end
  end

  resources :posts, only:[:new, :create, :index, :show]

end
