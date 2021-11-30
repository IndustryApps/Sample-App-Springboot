FROM openjdk:11.0.12-jdk
MAINTAINER baeldung.com
COPY build/libs/OEEApp-0.0.1-SNAPSHOT.jar OEEApp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/OEEApp-0.0.1-SNAPSHOT.jar"]
