# Chipotle Software 2016 (c) MIT License
class AnnalsController < ApplicationController

  before_action :set_annal, only: [:show, :edit, :update, :destroy, :download_file, :edit_json, :process]

  # GET /annals
  def index
    @annal  = Annal.new
    @annals = Annal.paginate(page: params[:page]).order('id DESC')
  end

  # GET/ edit_json member
  def edit_json
    @annal
  end

  # POST /process member
  def process
    @annal.process
  end

  # GET /annals/1/edit
  def edit
  end

  # GET /annals/download_file/1
  def download_file
    send_file(@annal.file.file.file,
              :disposition => 'attachment',
              :url_based_filename => false)
  end

  # POST /annals
  def create
    new_params = annal_params
    new_params[:user_id] = current_user.id
    new_params[:oname]   = new_params[:file].original_filename
    logger.debug "####  Panew_params #################>>>  #{new_params.inspect}"
    @annal = Annal.new new_params
    respond_to do |format|
      if @annal.save
        format.html { redirect_to annals_path, notice: 'The file was successfully uploaded.' }
        format.json { render :index, status: :ok, location: @annal }
      else
        @annals = Annal.all.order('id DESC')
        format.html { render :index }
        format.json { render json: @annal.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /annals/1
  def update
    respond_to do |format|
      if @annal.update(annal_params)
        format.html { redirect_to @annal, notice: 'Annal was successfully updated.' }
        format.json { render :show, status: :ok, location: @annal }
      else
        format.html { render :edit }
        format.json { render json: @annal.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /annals/1
  def destroy
    @annal.destroy
    respond_to do |format|
      format.html { redirect_to annals_url, notice: 'Annal was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_annal
    @annal = Annal.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def annal_params
    params.require(:annal).permit(:file, :notes)
  end
end
