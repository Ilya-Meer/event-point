module CurrentUserConcern
    extend ActiveSupport::Concern 

    included do
        before_action :set_current_user
    end

    def set_current_user
        if session[:user_id]
            @current_user = User.find(session[:user_id])
        end
    end

    def is_user_signed_in?
        @current_user.present? 
    end

    def is_authenticated?
        if is_user_signed_in?
            return true
        else
            render json: { error: "You must be logged in" }, status: :unauthorized 
        end
    end
end