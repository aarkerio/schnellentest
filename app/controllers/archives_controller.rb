# Chipotle Software 2016 (c) MIT License
class ArchivesController < ApplicationController

  before_action :set_archive, only: [:show, :edit, :update, :destroy]

  # GET /archives
  def index
    @archive  = Archive.new
    @archives = Archive.all.order('id DESC')
  end

  # GET /archives/1/edit
  def edit
  end

  # POST /archives
  def create
    @archive = Archive.new
    result = @archive.add_new(params, current_user.id)

    redirect_to archives_path, notice: 'Archive was successfully created.'
  end

  # PATCH/PUT /archives/1
  def update
    respond_to do |format|
      if @archive.update(archive_params)
        format.html { redirect_to @archive, notice: 'Archive was successfully updated.' }
        format.json { render :show, status: :ok, location: @archive }
      else
        format.html { render :edit }
        format.json { render json: @archive.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /archives/1
  def destroy
    @archive.destroy
    respond_to do |format|
      format.html { redirect_to archives_url, notice: 'Archive was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_archive
    @archive = Archive.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def archive_params
    params.require(:archive).permit(:file, :notes)
  end
end
