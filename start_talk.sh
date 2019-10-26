#!/bin/sh

########################
# Install:
# pip install Pygments
########################
# include the magic
########################
. demo-magic.sh

# Open talk
open talk/cdk.key

# Clean up old files
cd ./code
sh ./cleanup.sh
cd ..

# hide the evidence
clear

wait

source demos/simple_s3/run.sh
