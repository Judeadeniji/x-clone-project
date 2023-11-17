/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from "rc-extended/store";
import { supabase } from "./supabase";

type State = {
    user: Record<string, any> | null;
    session: Record<string, any> | null;
    tweets: any[];
    isLoggedIn: boolean;
}

const useUserStore = defineStore('user', {
    state: function () {
        return {
            user: null,
            session: null,
            tweets: [],
            isLoggedIn: false
        }
    },
    computed: {
        user: function (this: State) {
            return this.user
        },
        tweets: function (this: State) {
            return this.tweets
        }
    },
    actions: {
        setUser: function (this: State, _, data: State) {
            this.user = data.user;
            this.session = data.session;
            this.isLoggedIn = true
        },
        logOut: async function (this: State, _, cb: () => any) {
            const { error } = await supabase.auth.signOut()
            if (error) console.error(error)
            this.isLoggedIn = false
            this.session = null
            this.user = null
            this.tweets = []
            cb()
            
            return;
        }
    },
    effects: {
        sessionEff: function (this: State) {
            supabase.auth.getSession().then(response => {
                const session = response.data.session;

                //todo: handle response.error

                if (!session) {
                    this.isLoggedIn = false
                    this.session = null
                    this.user = null
                    this.tweets = []
                    return;
                }

                this.session = session
                this.user = session?.user || null
                this.isLoggedIn = true
            })
            return () => {

            }
        }
    }
})

export {
    useUserStore
}