# Springboot sample app

When developing an app for IndustryApps appstore, we should take care of two things. Service Discovery (Eureka)
registration and Authorization on AAS requests.

## Service Discovery Registration

### Adding dependencies

1. Spring cloud dependency

```groovy
ext {
    springCloudVersion = '2020.0.4'
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}

dependencies {
    implementation "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
}
```

2. Eureka dependency

```groovy
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client:3.0.4'
```

### Configuring Eureka Properties

1. Public hosting the app and launching though iApps

```yaml
eureka:
  instance:
    hostname: <app's public domain name>
    securePort: 443
    securePortEnabled: true
  server:
    url: https://servicediscovery.uat.industryapps.net
  client:
    serviceUrl:
      defaultZone: ${eureka.server.url}/eureka/
```

2. Hosting the app as a container in IndustryApps ecosystem

```yaml
eureka:
  instance:
    preferIpAddress: true
    securePortEnabled: false
    homePageUrl: http://${eureka.instance.hostname}:${eureka.instance.port}
  server:
    url: https://servicediscovery.uat.industryapps.net
  client:
    serviceUrl:
      defaultZone: ${eureka.server.url}/eureka/
```

Eureka server URL for UAT is https://servicediscovery.uat.industryapps.net. For production, it will
be https://servicediscovery.industryapps.net

### Set Application name as AppCode

```yaml
spring:
  application:
    name: <AppCode>
```

You can find the AppCode in App Information page of publish section.

![](https://files.uat.industryapps.net/files/documentation/images/AppCode.png)

### Set the application running port to 80

```yaml
server:
  port: 80
```

### Add ``@EnableEurekaClient`` annotation to the Application Class

```java

@SpringBootApplication
@EnableEurekaClient
public class OeeAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(OeeAppApplication.class, args);
    }

}
```

## Accessing data through AAS Gateway

App authentication token should be generated and sent on all request headers as
described [here](https://docs.industryapps.net/onboarding-to-industryapps/onboard-application/configure-application/app-permission/how-to-access-masterdata#getting-access-token)
.

In this sample app, we
used [FeignClient](https://cloud.spring.io/spring-cloud-netflix/multi/multi_spring-cloud-feign.html) for rest
communication and for token management, we
used [Springboot OAuth2 Client](https://spring.io/guides/tutorials/spring-boot-oauth2/)

### Adding dependencies

```groovy
implementation 'org.springframework.cloud:spring-cloud-starter-openfeign:3.0.5'
implementation 'org.springframework.boot:spring-boot-starter-oauth2-client:2.5.6'
```

### OAuth2 configuration
```yaml
spring.security.oauth2.client:
  registration:
    demo-app:
      client-id: <App ClientId>
      client-secret: <App ClientSecret>
      authorization-grant-type: client_credentials
      client-authentication-method: post
  provider:
    demo-app:
      token-uri: https://auth.uat.industryapps.net/auth/realms/IndustryApps/protocol/openid-connect/token
```
Auth Token URL in UAT is https://auth.uat.industryapps.net/auth/realms/IndustryApps/protocol/openid-connect/token.
For production, it will be https://auth.industryapps.net/auth/realms/IndustryApps/protocol/openid-connect/token

In Feign Client configuration class we added an interceptor to add the ``Authorization`` header with the Bearer token (App token) in all requests.
```java
@Bean
public RequestInterceptor requestInterceptor() {
    return requestTemplate -> {
        requestTemplate.header(HttpHeaders.AUTHORIZATION, oauth2Provider.getAuthenticationToken(AUTH_SERVER_NAME));
    };
}
```

## Containerizing the app

You can use some frameworks like [jib](https://github.com/GoogleContainerTools/jib), or you can build the jar and
containerize as below.

```dockerfile
FROM openjdk:11.0.12-jdk
MAINTAINER baeldung.com
COPY build/libs/OEEApp-0.0.1-SNAPSHOT.jar OEEApp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/OEEApp-0.0.1-SNAPSHOT.jar"]
```
