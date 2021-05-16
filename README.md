# terraform_docker_node_orm
**목적**
1. 테라폼을 이용해 EC2를 생성하고 Docker 위에 Nodejs 서버를 구축한다.
2. Nodejs 서버에서 RestfulAPI를 구축하고 ORM을 통해 DB와 통신하는 것이 목적 


**과정**
1. 테라폼을 이용한 AWS EC2 생성</br>
Note.</br>
키 설정 필요. ```ssh-keygen -t rsa -b 4096 -C "<EMAIL_ADDRESS>" -f "$HOME/.ssh/adminyd" -N ""```
이렇게 하면 adminyd.pub 파일이 생성되고, ```ssh -i ${home}/.ssh/adminyd ubuntu@{Public IP}``` 으로 접속하면 된다.
