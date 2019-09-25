#!/bin/bash

########################
# Install:
# pip install Pygments
########################
# include the magic
########################
. demo-magic.sh

cd ./code
sh ./cleanup.sh
cd ..

# hide the evidence
clear

source demos/simple_s3/run.sh
