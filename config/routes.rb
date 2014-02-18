LinkChecker::Application.routes.draw do
  root 'sites#index'
  get '/sites/new', to: 'sites#new', as: 'new_site'
  post '/sites', to: 'sites#create', as: 'sites'
  get '/sites/:id', to: 'sites#show', as: 'site'
  delete '/sites/:id', to: 'sites#destory'
  get '/sites', to: 'sites#index'

end

#  Prefix Verb   URI Pattern          Controller#Action
#     root GET    /                    sites#index
# new_site GET    /sites/new(.:format) sites#new
#    sites POST   /sites(.:format)     sites#create
#     site GET    /sites/:id(.:format) sites#show
#          DELETE /sites/:id(.:format) sites#destory
#          GET    /sites(.:format)     sites#index
