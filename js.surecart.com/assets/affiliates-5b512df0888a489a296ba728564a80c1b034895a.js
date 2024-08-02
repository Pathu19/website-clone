(() => {
    (function() {
        window.SureCartAffiliatesConfig = window.SureCartAffiliatesConfig || {}, window.SureCartAffiliatesConfig.baseURL = window.SureCartAffiliatesConfig.baseURL || "https://api.surecart.com/v1", window.SureCartAffiliatesConfig.publicToken = window.SureCartAffiliatesConfig.publicToken || null;

        function t(i) {
            let o = new RegExp("[?&]" + i + "=([^&#]*)").exec(location.search);
            return o === null ? "" : decodeURIComponent(o[1].replace(/\+/g, " "))
        }

        function c(i) {
            let o = ("; " + document.cookie).split("; " + i + "=");
            return o.length === 2 ? o.pop().split(";").shift() : null
        }

        function f(i, e, o, a) {
            let s = "expires=" + a.toUTCString();
            document.cookie = i + "=" + e + ";" + s + ";path=/;domain=" + o
        }

        function n(i, e) {
            return "SureCart Affiliates: " + i + (e === void 0 ? "" : " - " + e)
        }
        if (!window.SureCartAffiliatesConfig.baseURL) {
            console.error(n("Configuration Error", "baseURL is not set"));
            return
        }
        if (!window.SureCartAffiliatesConfig.publicToken) {
            console.error(n("Configuration Error", "publicToken is not set"));
            return
        }
        let r = t("aff");
        if (r) {
            let i = `${window.SureCartAffiliatesConfig.baseURL}/public/clicks`;
            fetch(i, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${window.SureCartAffiliatesConfig.publicToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    click: {
                        affiliation_code: r,
                        url: window.location.href,
                        referrer: document.referrer,
                        previous_click: c("sc_click_id")
                    }
                })
            }).then(e => (e.ok || console.warn(n("Tracking Failed", e.statusText)), e.json())).then(e => {
                if (e.id && e.domain && e.expires_at) {
                    let o = new Date(e.expires_at * 1e3);
                    f("sc_click_id", e.id, e.domain, o), console.log(n("Tracking Succeeded"))
                }
            }).catch(e => {
                console.error(n("Server Error", e))
            })
        }
    })();
})();
//# sourceMappingURL=/assets/affiliates.js-79b43c085fd41accd8f138f2b13e41d5888cb7a7.map