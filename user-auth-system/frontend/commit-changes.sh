#!/bin/bash
git diff --name-only | while IFS= read -r file; do
  git add "$file"
  git commit -m "Commit $file"
done
