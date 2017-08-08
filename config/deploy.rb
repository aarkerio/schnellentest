# config valid only for current version of Capistrano
lock "3.8.1"

set :application, 'schnellen_app'
set :deploy_user, 'wuser'
set :repo_url, "git@github.com:aarkerio/schnellentest.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/wuser/projects/rails/schnellentest"

# If the environment differs from the stage name
#set :rails_env, 'production'

# Defaults to false
# Skip migration if files in db/migrate were not modified
set :conditionally_migrate, true

# Symlinks
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# it's recommended to set the role to :app instead of :db
set :migration_role, :app

# whether we're using ssl or not, used for building nginx
# config file
set :enable_ssl, false

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
