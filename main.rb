require 'sinatra'
require 'sinatra/json'
require_relative 'lib/plot_data'

get '/data' do
  wn = params['wn'].to_f
  xi = params['xi'].to_f
  json data: PlotData.new(wn: wn, xi: xi).data
end
