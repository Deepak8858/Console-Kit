cmake_minimum_required(VERSION 3.10)  # MUST BE FIRST LINE
project(native-lib)  # Required project definition

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# For Android NDK builds:
add_library(native-lib SHARED 
    native-lib.cpp
)

# For Windows testing (optional):
if(WIN32)
    add_executable(native-lib-test WIN32
        native-lib.cpp
    )
endif()