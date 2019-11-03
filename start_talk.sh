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

# Show simple version
source demos/simple_s3/run.sh

# Switch back
open talk/cdk.key

# Full version
source demos/full_s3/run.sh

# Switch back
open talk/cdk.key

# Demo
source demos/local_dev/run.sh

# Switch back
open talk/cdk.key


