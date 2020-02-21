class ApplicationController < ActionController::Base

  def fallback_index_html
    render :file => 'app/views/index.html.erb'
  end

end
