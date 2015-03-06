require 'pry'
require 'sinatra'
require 'sqlite3'
require 'json'
DATABASE = SQLite3::Database.new("slideshow.db")
require_relative "database-setup.rb"
require_relative "models/slide.rb"

binding.pry

get "/" do
  erb :homepage
end

get "next-slide" do
  Slide.get_next_slide(params[:currentPosition]).to_hash.to_json
end

get "previous-slide" do
  Slide.get_previous_slide(params[:currentPosition]).to_hash.to_json
end
