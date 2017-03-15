class FileProcessWorker
  include Sidekiq::Worker

  def perform(*args)
    logger.debug "####  var #################>>>  FileProcessWorkerFileProcessWorkerFileProcessWorkerFileProcessWorker"
  end
end
