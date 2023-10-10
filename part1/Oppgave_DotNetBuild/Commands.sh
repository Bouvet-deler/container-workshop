
# Build docker image for building eample app from github
 podman build --no-cache -t stenbror/dotnetbuild .

# Executing image as interactive shekk ( Bash )
 podman run --rm -it --privileged -v "$(PWD):/home/app" stenbror/dotnetbuild:latest bash


# In a different window - Copy files from running image with given hash code or tag.
 podman cp [Hash of image running]:/home/app/GraphQL_DotNet_Example/out .\GraphQL_DotNet_Example\
