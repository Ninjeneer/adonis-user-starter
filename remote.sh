#!/bin/bash

# Remove AdonisUserStarter remote ref
git remote remove origin

# Add own repo ref
if [ "$#" -eq 1 ]
then
  git remote add origin $1
fi
