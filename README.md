# terraform_docker_node_orm
**목적**
1. 테라폼을 이용해 EC2를 생성하고 Docker 위에 Nodejs 서버를 구축한다.
2. Nodejs 서버에서 RestfulAPI를 구축하고 ORM을 통해 DB와 통신하는 것이 목적 


**과정**
### 1. 테라폼을 이용한 AWS EC2 생성</br>
Note.</br>
키 설정 필요. ```ssh-keygen -t rsa -b 4096 -C "<EMAIL_ADDRESS>" -f "$HOME/.ssh/adminyd" -N ""```
이렇게 하면 adminyd.pub 파일이 생성되고, ```ssh -i ${home}/.ssh/adminyd ubuntu@{Public IP}``` 으로 접속하면 된다.

### 2. 도커</br>
**Issue Note**</br>
    1. 볼륨 옵션을 통해 컨테이너에서 생성되는 자료를 보관하고 외부 IDE에서 편집하고자 했음.
    - 발생했던 문제들
      - 컨테이너가 root권한으로 설정 될 경우,  외부 볼륨에서 파일을 수정 할 수 없음. 
      - 컨테이너에서 user를 생성할 경우, root권한이 없어 root권한이 필요한 작업 수행 불가.
    
      **원인**
      - HostOS의 유저ID와 그룹ID는 컨테이너와 공유되는데, 컨테이너는 리눅스 커널 위에서 동작하기 때문에 기본적으로 Root권한으로 실행된다. (하지만 이 Root권한은 HostOS의 root와는 다른 권한으로 취급할 수 있다. // 다른 사람들은 Fake root라고도 표현했음.) 컨테이너에서 기본적으로 부여하는 root권한으로 파일을 생성 할 시 외부 볼륨에서는 "도커루트가 만든 파일 이구나"라고 판단하지 못하고 "Root? 나는 유저니까 root파일은 건드릴수없지" 라며 파일을 수정하지 않는다. 따라서 UID를 잘 세팅해야 외부 볼륨에서도 파일을 수정할 수 있다.
    - 따라서 도커 파일을 생성해 user에서 root작업을 하기 위한 sudo와 sudo에 필요한 비밀번호를 세팅한다.
    ```
    #최신 node 이미지를 기반으로 한다.
    FROM node:latest

    #sudo가 설치되어 있지 않기 때문에 sudo를 설치한다
    RUN apt-get update && apt-get -y install sudo


    # 노드라는 이름의 유저의 비밀번호를 1로 세팅하고 sudo 그룹에 추가한다.
    RUN echo "node:1" | chpasswd && adduser node sudo

    #컨테이너 user를 노드로 설정한다.
    USER node
    CMD /bin/bash
    ```
    이렇게 도커 파일을 통해 이미지를 생성한 다음 컨테이너를 생성한다.

    ```
    docker run -it -v /home/ubuntu/node:/home/node -p 5000:5000 -u $UID nodeyd:0.1 /bin/bash
    ```
    - -p node 서버를 포팅하기 위해 5000포드로 포트포워딩 세팅
    - **-u $UID 현재 터미널 유저와 동일한 권한을 가지는 유저로 컨테이너를 실행한다. (이게 가장 중요했음)**
    -  -v 외부 볼륨을 설정하여 컨테이너 내부의 자료를 외부 접근이 용이하도록함.


### 3. RDS ORM</br>
- 지난 프로젝트에서 사용했던 RDS-mysql 서버에 연결하여 table에 맞게 객체를 생성하고 원하는 데이터 조회 
### 4. S3 data upload</br>
- 이미지 업로드를 위해 S3 버킷을 생성하고 이미지 업로드