import { createClient } from "@supabase/supabase-js"

const SUPA_URL = "https://mxdymurrvkmltqynkovj.supabase.co"
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14ZHltdXJydmttbHRxeW5rb3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMjcyNjgsImV4cCI6MjAxNTcwMzI2OH0.AT4ho0GlKGjtTyZijZdJz8lRnVKBVNHVsTjSIQEQ6dU"

export const supabase = createClient(
    SUPA_URL,
    SUPA_KEY
)

export interface UserData {
    email: string;
    password: string;
    phone: string;
    options: {
        data: {
            first_name: string;
            last_name: string;
            age: string;
            dob: string;
            created: string;
        }
    }
}

export async function createUser(data: UserData) {
    const authResponse = await supabase.auth.signUp({
        ...data,
        options: {
            data: data.options.data,
            emailRedirectTo: 'http://localhost:5173/login'
        }
    })

    return authResponse;
}

export async function signInUser({ email, phone, password }: Pick<UserData, "email" | "phone" | "password">) {
    if (email) {
        const response = await supabase.auth.signInWithPassword({
            email, password
        })

        return response
    } else if (phone) {
        const response = await supabase.auth.signInWithPassword({
            phone, password
        })

        return response
    }
}