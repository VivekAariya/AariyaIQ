"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsentBanner() {
    useEffect(() => {
        const loadCookieConsent = async () => {
            CookieConsent.run({
                // Categories configuration
                categories: {
                    necessary: {
                        enabled: true,
                        readOnly: true,
                    },
                    analytics: {
                        enabled: false,
                        readOnly: false,
                        autoClear: {
                            cookies: [
                                {
                                    name: /^_ga/,
                                },
                                {
                                    name: "_gid",
                                },
                            ],
                        },
                    },
                    marketing: {
                        enabled: false,
                        readOnly: false,
                        autoClear: {
                            cookies: [
                                {
                                    name: /^_fb/,
                                },
                                {
                                    name: "_gcl_au",
                                },
                            ],
                        },
                    },
                },

                // Language configuration
                language: {
                    default: "en",
                    translations: {
                        en: {
                            consentModal: {
                                title: "We use cookies",
                                description:
                                    "This website uses cookies to ensure you get the best experience on our website. You can choose which cookies you accept.",
                                acceptAllBtn: "Accept all",
                                acceptNecessaryBtn: "Reject all",
                                showPreferencesBtn: "Manage preferences",
                                footer: `
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms of service</a>
                `,
                            },
                            preferencesModal: {
                                title: "Cookie preferences",
                                acceptAllBtn: "Accept all",
                                acceptNecessaryBtn: "Reject all",
                                savePreferencesBtn: "Save preferences",
                                closeIconLabel: "Close modal",
                                sections: [
                                    {
                                        title: "Cookie Usage",
                                        description:
                                            'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                                    },
                                    {
                                        title: "Strictly Necessary Cookies",
                                        description:
                                            "These cookies are essential for the website to function properly. They cannot be disabled.",
                                        linkedCategory: "necessary",
                                    },
                                    {
                                        title: "Analytics Cookies",
                                        description:
                                            "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
                                        linkedCategory: "analytics",
                                    },
                                    {
                                        title: "Marketing Cookies",
                                        description:
                                            "These cookies are used to track visitors across websites to display relevant advertisements.",
                                        linkedCategory: "marketing",
                                    },
                                ],
                            },
                        },
                    },
                },

                // GUI options
                guiOptions: {
                    consentModal: {
                        layout: "box wide",
                        position: "bottom left",
                        equalWeightButtons: true,
                        flipButtons: false,
                    },
                    preferencesModal: {
                        layout: "box",
                        position: "right",
                        equalWeightButtons: true,
                        flipButtons: false,
                    },
                },

                // Cookie options
                cookie: {
                    name: "cc_cookie",
                    domain: typeof window !== "undefined" ? window.location.hostname : "",
                    path: "/",
                    sameSite: "Lax",
                    expiresAfterDays: 365,
                },

                // Callback functions
                onFirstConsent: ({ cookie }) => {
                    console.log("First consent given!", cookie);
                },

                onConsent: ({ cookie }) => {
                    console.log("Consent updated!", cookie);

                    // Handle analytics consent
                    if (cookie.categories.includes("analytics")) {
                        // Initialize Google Analytics or other analytics
                        console.log("Analytics enabled");
                    }

                    // Handle marketing consent
                    if (cookie.categories.includes("marketing")) {
                        // Initialize marketing pixels/tags
                        console.log("Marketing enabled");
                    }
                },

                onChange: ({ cookie, changedCategories }) => {
                    console.log("Consent changed!", cookie, changedCategories);
                },
            });
        };

        loadCookieConsent();
    }, []);

    return null;
}
