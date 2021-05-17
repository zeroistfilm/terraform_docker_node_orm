FROM node:latest

RUN apt-get update && \
      apt-get -y install sudo

# RUN echo "node:1" | chpasswd
RUN echo "node:1" | chpasswd && adduser node sudo
USER node
CMD /bin/bash

#해당 도커 파일은 노드 오피셜 이미지를 기반으로 함.
#root권한이 아닌 일반 유저로 실행하기 위해 sudo 설치, node 사용자의 비밀번호 세팅.

#docker run -it -v /home/ubuntu/node:/home/node -p 5000:5000 -u $UID nodeyd:0.1 /bin/bash
