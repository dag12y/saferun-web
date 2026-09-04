#!/bin/sh
set -eu

curl --fail --silent --show-error --location --proto '=https' --tlsv1.2 \
  https://raw.githubusercontent.com/dag12y/saferun/0ba0ddf6d4b809ab61195f833c507025263003a5/install.sh | sh
