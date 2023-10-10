
 podman build --no-cache -t stenbror/dotnetbuild .

 podman run --rm -it --privileged -v "$(PWD):/home/app" stenbror/dotnetbuild:latest bash

 podman cp [Hash of image running]:/home/app/GraphQL_DotNet_Example/out .\GraphQL_DotNet_Example\
