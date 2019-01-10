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

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :destroy]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :usergroup, only: [:index, :show, :create]
    end
  end

  resources :posts, only:[:new, :create, :index, :show]

  namespace :api do
    namespace :v1 do
      resources :messages, only: [:create]
      resources :users, only: [:index]
    end
  end

  resources :users, only: [:index, :show, :create, :destroy]

  devise_scope :user do
    get "users/sign_out" => "devise/sessions#destroy"
  end

  # get "/chats/:id", to: "homes#index"

  get "/users/:id", to: "homes#index"
end
