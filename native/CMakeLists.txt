# Define a versão mínima (3.18 é recomendada para o FindCUDAToolkit moderno)
# A sintaxe com '...' garante compatibilidade com as políticas até a versão 3.31
cmake_minimum_required(VERSION 3.18...3.31)

# Corrigido: O comando project() deve ser chamado antes para definir PROJECT_NAME
project(sl_zed_c LANGUAGES C CXX)

# Configurações do Padrão C++
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_POSITION_INDEPENDENT_CODE ON) # Substitui o -fPIC manual

set(EXECUTABLE_OUTPUT_PATH "${CMAKE_CURRENT_BINARY_DIR}")

# Encontra a ZED SDK
find_package(ZED 3 REQUIRED)

# Encontra CUDA através da forma moderna (o antigo find_package(CUDA) está obsoleto)
find_package(CUDAToolkit REQUIRED)
message(STATUS "CUDA Version : ${CUDAToolkit_VERSION}")

# Coleta de arquivos fonte (Usando CONFIGURE_DEPENDS para o CMake notar novos arquivos)
file(GLOB_RECURSE HDRS_RS CONFIGURE_DEPENDS "include/*.hpp" "include/*.h")
file(GLOB_RECURSE SRCS_RS CONFIGURE_DEPENDS "src/*.cpp" "src/*.c")

# Cria a biblioteca compartilhada
add_library(${PROJECT_NAME} SHARED ${SRCS_RS} ${HDRS_RS})

# Inclusão de diretórios de forma isolada para este alvo (Target-Based)
target_include_directories(${PROJECT_NAME} PRIVATE
    ${EIGEN3_INCLUDE_DIR}
    ${ZED_INCLUDE_DIRS}
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Se as bibliotecas da ZED não forem Targets importados, informamos os diretórios de link
if(ZED_LIBRARY_DIR)
    target_link_directories(${PROJECT_NAME} PRIVATE ${ZED_LIBRARY_DIR})
endif()

# Definições globais do seu alvo
target_compile_definitions(${PROJECT_NAME} PRIVATE INTERFACE_EXPORT WITH_UNLIMITED_CAMERA)

# Configurações Específicas por Compilador/Plataforma
if(MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE /permissive- /O2)
    target_compile_definitions(${PROJECT_NAME} PRIVATE ZED_CTRL_EXPORT)

    # Linkagem no Windows
    target_link_libraries(${PROJECT_NAME} PRIVATE
        debug sl_zed64d 
        optimized sl_zed64
        CUDA::cudart_static
        CUDA::cuda_driver
    )

    # Instalação no Windows usando variáveis de ambiente
    set(SL_C_INTERFACE_LIB_DIR "$ENV{SL_ZED_SDK_INSTALL}/lib/")
    set(SL_C_INTERFACE_BIN_DIR "$ENV{SL_ZED_SDK_INSTALL}/bin/")
    set(SL_C_INTERFACE_INCLUDE_DIR "$ENV{SL_ZED_SDK_INSTALL}/include/sl/")

    install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/include/sl/c_api/zed_interface.h DESTINATION "${SL_C_INTERFACE_INCLUDE_DIR}/c_api/")
    install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/include/sl/c_api/types_c.h DESTINATION "${SL_C_INTERFACE_INCLUDE_DIR}/c_api/")
    install(TARGETS ${PROJECT_NAME} 
            RUNTIME DESTINATION "${SL_C_INTERFACE_BIN_DIR}" 
            ARCHIVE DESTINATION "${SL_C_INTERFACE_LIB_DIR}" 
            COMPONENT library)

else()
    target_compile_options(${PROJECT_NAME} PRIVATE -O3)
    
    if(CMAKE_BUILD_TYPE STREQUAL "Debug")
        target_compile_definitions(${PROJECT_NAME} PRIVATE _DEBUG _GLIBCXX_DEBUG)
    endif()

    # Linkagem no Linux/Outros
    target_link_libraries(${PROJECT_NAME} PRIVATE
        ${ZED_LIBRARIES}
        CUDA::cuda_driver
        gomp
        pthread
        usb-1.0
    )

    # Instalação no Linux
    set(SL_C_INTERFACE_LIB_DIR "/usr/local/zed/lib")
    install(TARGETS ${PROJECT_NAME} DESTINATION "${SL_C_INTERFACE_LIB_DIR}")
    install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/include/sl/c_api/zed_interface.h DESTINATION "/usr/local/zed/include/sl/c_api")
    install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/include/sl/c_api/types_c.h DESTINATION "/usr/local/zed/include/sl/c_api")
endif()