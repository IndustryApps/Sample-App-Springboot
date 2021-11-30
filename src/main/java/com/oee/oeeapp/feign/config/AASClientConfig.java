package com.oee.oeeapp.feign.config;

import com.oee.oeeapp.feign.service.OAuth2Provider;
import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class AASClientConfig {

    private final OAuth2Provider oauth2Provider;
    private final String AUTH_SERVER_NAME = "demo-app";

    @Autowired
    public AASClientConfig(OAuth2Provider oauth2Provider) {
        this.oauth2Provider = oauth2Provider;
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            requestTemplate.header(
                    HttpHeaders.AUTHORIZATION, oauth2Provider.getAuthenticationToken(AUTH_SERVER_NAME));
        };
    }
}
