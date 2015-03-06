require 'pry'
require 'sinatra'
require 'sqlite3'
require 'json'
DATABASE = SQLite3::Database.new("slideshow.db")
require_relative "database-setup.rb"
require_relative "models/slide.rb"


get "/" do
  erb :homepage
end

post "/next-slide" do
  Slide.get_next_slide(params[:currentPosition]).to_hash.to_json
end

post "/previous-slide" do
  Slide.get_previous_slide(params[:currentPosition]).to_hash.to_json
end

post "/edit-slide" do
  Slide.find(params["id"]).edit(params).save.to_hash.to_json
end
