type Nullable<T> = T | null;
type Callback = () => void;

interface Subscription {
    callback: Callback;
    subscription: number;
}

interface UserModel {
    isAuthenticated: boolean;
    name: string;
}

export class AuthorizeService {
    private _subscriptions: Subscription[] = [];
    private _nextSubscriptionId = 0;
    private _user: Nullable<UserModel> = null;
    
    async isAuthenticated(): Promise<boolean> {
        const user = await this.getUser();
        return !!(user && user.isAuthenticated);
    }

    async getUser(): Promise<Nullable<UserModel>> {
        if (this._user) {
            return this._user;
        }

        const user = await this.fetchUser();
        this.updateState(user);
        return this._user;
    }

    async signOut(): Promise<void> {
        await fetch("/user/signout");
        window.location.href = "/signedout"; // Forces a refresh of the page.
    }

    updateState(user: Nullable<UserModel>) {
        this._user = user;
        this.notifySubscribers();
    }

    subscribe(callback: Callback) {
        this._subscriptions.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId: number) {
        const subscriptionIndex = this._subscriptions
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false, index: -1 })
            .filter(element => element.found === true);

        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        this._subscriptions = this._subscriptions.splice(subscriptionIndex[0].index, 1);
    }

    private async fetchUser(): Promise<Nullable<UserModel>> {
        try {
            const response = await fetch("/user/info");
            const user: UserModel = await response.json();
            return user;
        } catch (e) {
            console.error("Could not fetch user", e);
            return null;
        }
    }

    private notifySubscribers() {
        for (let i = 0; i < this._subscriptions.length; i++) {
            const callback = this._subscriptions[i].callback;
            callback();
        }
    }

    static get instance() { return authorizeService; }
}

const authorizeService = new AuthorizeService();

export default authorizeService;
