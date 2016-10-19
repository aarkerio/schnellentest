# Chipotle Software 2016 (c) MIT License
class ImportsController < ApplicationController

  before_action :set_import, only: [:show, :edit, :update, :destroy, :download_file]

  # GET /imports
  def index
    @import  = Import.new
    @imports = Import.all.order('id DESC')
  end

  # GET /imports/1/edit
  def edit
  end

  # GET /imports/download_file/1
  def download_file
    send_file(@import.file.file.file,
              :disposition => 'attachment',
              :url_based_filename => false)
  end
  # POST /imports
  def create
    new_params = import_params
    new_params[:oname]   = new_params[:file].original_filename
    new_params[:user_id] = current_user.id
    import = Import.create new_params
    if import.id
      import.import_json
      redirect_to imports_path, notice: 'The file was successfully uploaded.'
    else
      @imports = Import.all.order('id DESC')
      render :index
    end
  end

  # PATCH/PUT /imports/1
  def update
    respond_to do |format|
      if @import.update(import_params)
        format.html { redirect_to @import, notice: 'Import was successfully updated.' }
        format.json { render :show, status: :ok, location: @import }
      else
        format.html { render :edit }
        format.json { render json: @import.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imports/1
  def destroy
    @import.destroy
    respond_to do |format|
      format.html { redirect_to imports_url, notice: 'Import was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_import
    @import = Import.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def import_params
    params.require(:import).permit(:file, :notes)
  end
end
