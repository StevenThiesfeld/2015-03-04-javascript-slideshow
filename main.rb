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
