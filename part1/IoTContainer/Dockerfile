
FROM ubuntu:latest

RUN apt-get update && \
        apt-get upgrade -y && \
        apt-get clean && \
        apt-get install -y \
            build-essential \
            wget \
            curl \
            git \
            cmake 


WORKDIR /home/dev
ADD . /home/dev

RUN wget -qO- https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2 | tar -xj

ENV PATH $PATH:/home/dev/gcc-arm-none-eabi-10.3-2021.10/bin

WORKDIR /home/app

RUN git clone https://github.com/AFontaine79/stm-blinky.git

WORKDIR /home/app/stm-blinky

CMD ["bash"]
