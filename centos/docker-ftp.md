# vsftpd 搭建

https://hub.docker.com/r/fauria/vsftpd

云服务安全组设置20 21 21100-21110
```
docker pull fauria/vsftpd


// 使用默认用户帐户在活动模式下创建一个容器，并绑定数据目录
docker run -d -p 21:21 -v /my/data/directory:/home/vsftpd --name vsftpd fauria/vsftpd
# see logs for credentials:
docker logs vsftpd


// 使用自定义用户帐户创建生产容器，绑定数据目录并启用主动和被动模式
docker run -d -v /my/data/directory:/home/vsftpd \
-p 20:20 -p 21:21 -p 21100-21110:21100-21110 \
-e FTP_USER=myuser -e FTP_PASS=mypass \
-e PASV_ADDRESS=127.0.0.1 -e PASV_MIN_PORT=21100 -e PASV_MAX_PORT=21110 \
--name vsftpd --restart=always fauria/vsftpd
```