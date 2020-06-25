# Chipotle Software (c) 2016-2020 MIT License

class TestsController < ApplicationController
  before_action :set_test, only: [:show, :edit, :update, :destroy, :print]

  # GET /tests
  def index
  end

  # GET /tests/1
  def show
  end

  # GET /tests/new
  def new
    @test = Test.new
  end

  # GET /tests/1/edit
  def edit
  end

  # GET /tests/1/print
  def print
    respond_to do |format|
      format.pdf do
        render pdf:            'file_name',     # Excluding ".pdf" extension.
               page_size:      'Letter'         # default A4
      end
    end
  end

  # POST /tests
  def create
    test = Test.new(test_params)

    redirect_to test, notice: 'Test was successfully created.' if test.save
  end

  # PATCH/PUT /tests/1
  def update
    if @test.update(test_params)
      redirect_to @test, notice: 'Test was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /tests/1
  def destroy
    @test.destroy
    redirect_to tests_url, notice: 'Test was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_test
    @test = Test.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def test_params
    params.require(:test).permit(:title, :description, :active, :shared)
  end
end
