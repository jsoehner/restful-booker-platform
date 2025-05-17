FROM cgr.dev/chainguard/jdk:21

ADD . /usr/local/room

WORKDIR /usr/local/room

COPY target ./

ENV profile=dev
ENV authDomain=rbp-auth
ENV bookingDomain=rbp-booking

ENTRYPOINT java -jar -Dspring.profiles.active=$profile target/restful-booker-platform-room-*.jar -D