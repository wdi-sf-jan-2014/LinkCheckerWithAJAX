LinkChecker::Application.routes.draw do
  root 'sites#index'
  get '/sites/new', to: 'sites#new', as: 'new_site'
  post '/sites', to: 'sites#create', as: 'sites'
  get '/sites/:id', to: 'sites#show', as: 'site'
  delete '/sites/:id', to: 'sites#destroy'
  get '/sites', to: 'sites#index'

end
