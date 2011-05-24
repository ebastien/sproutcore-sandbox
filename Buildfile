# ===========================================================================
# Project:   Todos
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [
    "sproutcore/core_foundation",
    "sproutcore/datastore",
    "sproutcore/ajax",
    :my_charts
  ],
  :theme => "sproutcore/empty_theme"

proxy '/data/todos', :to => 'localhost:4567'
