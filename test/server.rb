require 'sinatra'
require 'json'

get '/data/todos' do
  content_type :json
  [
    { "guid" => "todo-1",
      "title" => "Build my first SproutCore app",
      "isDone" => false },
 
    { "guid" => "todo-2",
      "title" => "Build a really awesome SproutCore app",
      "isDone" => false },
 
    { "guid" => "todo-3",
      "title" => "Next, the world!",
      "isDone"=> false }
  ].to_json
end
