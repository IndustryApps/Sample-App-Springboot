package com.oee.oeeapp.feign.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Provider {

    private final OAuth2AuthorizedClientManager authorizedClientManager;

    @Autowired
    public OAuth2Provider(OAuth2AuthorizedClientManager authorizedClientManager) {
        this.authorizedClientManager = authorizedClientManager;
    }

    public String getAuthenticationToken(final String authZServerName) {
        final OAuth2AuthorizeRequest request =
                OAuth2AuthorizeRequest.withClientRegistrationId(authZServerName)
                        .principal(SecurityContextHolder.getContext().getAuthentication())
                        .build();
        return "Bearer " + authorizedClientManager.authorize(request).getAccessToken().getTokenValue();
    }
}
