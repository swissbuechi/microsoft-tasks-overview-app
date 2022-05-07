import * as msal from "@azure/msal-browser";
import Vue, {PluginObject, VueConstructor} from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $msal: MsalPlugin;
    }
}

export interface MsalPluginOptions {
    clientId: string;
    loginAuthority: string;
}

let msalInstance: msal.PublicClientApplication;

export let msalPluginInstance: MsalPlugin;

export class MsalPlugin implements PluginObject<MsalPluginOptions> {

    public isAuthenticated = false;
    public name: any = "";
    private pluginOptions: MsalPluginOptions = {
        clientId: "",
        loginAuthority: "",
    };

    public install(vue: VueConstructor<Vue>, options?: MsalPluginOptions): void {
        if (!options) {
            throw new Error("MsalPluginOptions must be specified");
        }
        this.pluginOptions = options;
        this.initialize(options);
        msalPluginInstance = this;
        vue.prototype.$msal = Vue.observable(msalPluginInstance);
    }

    // public async signInPopUp() {
    //     try {
    //         const loginRequest: msal.PopupRequest = {
    //             // scopes: ["User.Read"],
    //             scopes: ["https://graph.microsoft.com/.default"],
    //         };
    //         const loginResponse: msal.AuthenticationResult = await msalInstance.loginPopup(loginRequest);
    //         this.isAuthenticated = !!loginResponse.account;
    //         // do something with this?
    //     } catch (err) {
    //         // handle error
    //         this.isAuthenticated = false;
    //     }
    // }

    public async signInRedirect() {
        try {
            const tokenResponse = await msalInstance.handleRedirectPromise();
            let accountObj;
            if (tokenResponse) {
                accountObj = tokenResponse.account;
                this.isAuthenticated = !!tokenResponse.account
                this.getName()
                // }
            } else {
                accountObj = msalInstance.getAllAccounts()[0];
            }

            if (accountObj && tokenResponse) {
                this.isAuthenticated = !!tokenResponse.account
                console.log("[AuthService.init] Got valid accountObj and tokenResponse")
            } else if (accountObj) {
                // this.isAuthenticated = true
                console.log("[AuthService.init] User has logged in, but no tokens.");
            } else {
                // this.isAuthenticated = true
                console.log("[AuthService.init] No accountObject or tokenResponse present. User must now login.");
                await msalInstance.loginRedirect({scopes: ["user.read"]})
            }
        } catch (error) {
            console.error("[AuthService.init] Failed to handleRedirectPromise()", error)
            this.isAuthenticated = false
        }

    }

    public async signOut() {
        await msalInstance.logoutRedirect();
        this.isAuthenticated = false;
    }

    public async acquireToken(scopes = ['user.read', 'openid', 'profile', 'email'], idToken: boolean) {
        const request = {
            scopes: scopes,
            account: msalInstance.getAllAccounts()[0]
        };
        try {
            const response = await msalInstance.acquireTokenSilent(request)
            if (idToken) return response.idToken
            return response.accessToken
        } catch (error) {
            if (error instanceof msal.InteractionRequiredAuthError) {
                return msalInstance.acquireTokenPopup(request).catch((popupError) => {
                    console.error(popupError);
                });
            }
            return false;
        }
    }

    private initialize(options: MsalPluginOptions) {
        const msalConfig: msal.Configuration = {
            auth: {
                clientId: options.clientId,
                authority: options.loginAuthority,
            },
            system: {
                loggerOptions: {
                    loggerCallback: (level: msal.LogLevel, message: string, containsPii: boolean): void => {
                        if (containsPii) {
                            return;
                        }
                        switch (level) {
                            case msal.LogLevel.Error:
                                console.error(message);
                                return;
                            case msal.LogLevel.Info:
                                console.info(message);
                                return;
                            case msal.LogLevel.Verbose:
                                console.debug(message);
                                return;
                            case msal.LogLevel.Warning:
                                console.warn(message);
                                return;
                        }
                    },
                    piiLoggingEnabled: false,
                    logLevel: msal.LogLevel.Verbose
                }
            }
        };
        msalInstance = new msal.PublicClientApplication(msalConfig);
        this.isAuthenticated = this.getIsAuthenticated();
    }

    private getIsAuthenticated(): boolean {
        const accounts: msal.AccountInfo[] = msalInstance.getAllAccounts();
        return accounts && accounts.length > 0;
    }

    public getName(): any {
        const accounts: msal.AccountInfo[] = msalInstance.getAllAccounts();
        return this.name = accounts[0]?.name;
    }

    public getRoles(): any {
        const accounts: msal.AccountInfo[] = msalInstance.getAllAccounts();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return accounts[0].idTokenClaims?.roles;
    }
}