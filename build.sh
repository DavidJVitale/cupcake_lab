#!/bin/bash
# David Vitale, 
# Compile react components, deploy all python instances
# Prompts user to recompile frontend or redeploy python instances

dir_of_script="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#runs npm install on frontend
run_npm_install(){
    cd $dir_of_script
    cd ./django_app/MainCupcakeAssembler/react_frontend
    npm install
}

# use webpack for front end compilation
compile_front_end(){
    cd $dir_of_script
    cd ./django_app/MainCupcakeAssembler/react_frontend
    webpack
}

# runs all 3 python web frameworks
run_all_python_web(){
    cd $dir_of_script
    #Run Django
    sudo python ./django_app/manage.py runserver &
    #Run Flask
    cd flask_app
    export FLASK_APP=server.py
    flask run &
    #Run Pyramid
    cd $dir_of_script
    cd pyramid_app
    sudo python server.py &
}

# killall 3 python web framework instances
kill_all_python_web(){
    sudo killall python
    sudo killall flask
}

# prints the options for controlling recompilation
print_options_text(){
    echo -e "\n-----\nSee above for compliation details, below for runtime"
    echo -e "Refresh webpage to view most up-to-date.\n-----"
    echo -e "'f' to recompile front end,"
    echo -e "'p' to redploy all 3 python webframeworks"
    echo -e "'e' to exit.\n-----" 
}

# -------------
# START PROGRAM
# ------------

run_npm_install
compile_front_end
kill_all_python_web
run_all_python_web
#open a firefox window
sleep 1 && firefox http://localhost:8000 > /dev/null &

while true; do
    print_options_text
    #read in one character
    read -n 1 option
    #clear screen
    printf "\033c"
    case "$option" in
        f) compile_front_end
           ;;
        d) kill_all_python_web
           run_all_python_web
           ;;
        e) kill_all_python_web
           echo "Python webservers killed. Goodbye!"
           exit
           ;;
    esac
done
