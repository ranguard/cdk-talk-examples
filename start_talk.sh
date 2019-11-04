#!/bin/sh

########################
# Install:
# pip install Pygments
########################
# include the magic
########################
. demo-magic.sh

# Don't show install progress
# makes a little faster
npm set progress=false
# Clean up old files
cd ./code
sh ./cleanup.sh
cd ..

mirror -off

# hide the evidence
clear

# Open talk
open talk/cdk.key
wait

# Show simple version
mirror -on
source demos/simple_s3/run.sh
mirror -off

# Switch back
open talk/cdk.key
wait

# Full version
mirror -on
source demos/full_s3/run.sh
mirror -off

# Switch back
open talk/cdk.key
wait

# Demo
mirror -on
source demos/local_dev/run.sh
mirror -off

# Switch back
open talk/cdk.key

npm set progress=true
