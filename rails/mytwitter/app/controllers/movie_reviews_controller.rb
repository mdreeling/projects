class MovieReviewsController < ApplicationController
  before_filter :signed_in_user, only: [:create, :destroy]
  before_filter :correct_user,   only: :destroy    # NEW LINE
  def show
    @movie_review = MovieReview.find(params[:id])
    @user = @movie_review.user
  end
  
  def create
    @movie_review = current_user.movie_reviews.build(params[:movie_review])
    if @movie_review.save
      flash[:success] = "Movie Review created!"
      redirect_to root_url
    else
      render 'static_pages/home' , :object => @movie_review
    end
  end
  
  def index
    if current_user.nil?
      @movie_reviews = MovieReview.find(:all)
    else
    @user = current_user
    @movie_reviews = @user.movie_reviews    # NEW LINE
    @movie_reviews_all =  MovieReview.find(:all)
    @microposts = current_user.microposts if signed_in?
    @micropost = current_user.microposts.build if signed_in?
    @movie_review = current_user.movie_reviews.build if signed_in?
    @genres = Genre.all if signed_in?
    @mediatypes = Medium.all if signed_in?
    end
  end
  
  # GET /genres/1/edit
  def edit
    @genres = Genre.all 
    @mediatypes = Medium.all 
    @movie_review = MovieReview.find(params[:id])
  end
  
  # PUT /genres/1
  # PUT /genres/1.json
  def update
    @movie_review = MovieReview.find(params[:id])

    respond_to do |format|
      if @movie_review.update_attributes(params[:movie_review])
        format.html { redirect_to @movie_review, notice: 'Movie was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end


  # UPDATED IMPLEMENTATION
  def destroy
    @movie_review.destroy
    redirect_to root_url
  end

  # NEW PRIVATE METHOD
  private

  def correct_user
    @movie_review = current_user.movie_reviews.find_by_id(params[:id])
    redirect_to root_url if @movie_review.nil?
  end
end