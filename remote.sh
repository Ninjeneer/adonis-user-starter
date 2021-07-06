#!/bin/bash

# Remove AdonisUserStarter remote ref
echo "This script removes the origin remote ref to let you replace by yours"
git remote remove origin
echo "Removed default origin ref"

# Add own repo ref
if [ "$#" -eq 1 ]
then
  git remote add origin $1
	echo "New origin ref has been updated"
fi
