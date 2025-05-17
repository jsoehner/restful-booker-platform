FROM cgr.dev/chainguard/jdk:21

ADD . /usr/local/message

WORKDIR /usr/local/message

COPY target ./

ENV authDomain=rbp-auth
ENV profile=dev

ENTRYPOINT java -jar -Dspring.profiles.active=$profile target/restful-booker-platform-message-*.jar -D