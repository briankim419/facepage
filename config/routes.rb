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
      resources :groups, only: [:index, :show, :create]
    end
  end



  namespace :api do
    namespace :v1 do
      resources :messages, only: [:create, :show]
      resources :users, only: [:index]
    end
  end

  resources :users, only: [:search] do
    get 'search', on: :collection
  end

  resources :users, only: [:index, :show, :create, :destroy]
  resources :posts, only: [:new, :create, :index, :show]
  resources :groups, only: [:index, :show, :create, :detroy]

  devise_scope :user do
    get "users/sign_out" => "devise/sessions#destroy"
  end


  get "/groups/:id/chats", to: "homes#index"
end
