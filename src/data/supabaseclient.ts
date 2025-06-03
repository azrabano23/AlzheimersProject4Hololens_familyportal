import { createClient, type Session, type User } from '@supabase/supabase-js'
import type { StoredUser } from './types'


export const supabase = createClient(
    'https://ujsljeyrsxniajsqizar.supabase.co', 
    import.meta.env.VITE_SUPABASE_API_KEY
)



export async function GetSignedInUser() {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        return true
    }
    return false
}

export async function SignOut() {
    const data = await supabase.auth.signOut()
    return data
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<{user: User, session: Session} | null> {
    try {
        const result = await supabase.auth.signInWithPassword({
            email: email,
            password: password
         })
         if (result.data.user && result.data.session) {
            return result.data
         }
     } catch {
        return null
     }
     return null
}


export async function getUserById(id: string): Promise<StoredUser | null> {
    const { data, error } = await supabase.from("users").select("*").eq("user_id", id)
    if (error) {
        console.error("Error fetching user by ID:", error.message);
        return null;
    }

    if(data.length <= 0 || !data) {
        console.error("No user found");
        return null
    }
    console.log("Fetched user from Users table:", data[0])

    return {
        user_id: data[0].user_id,
        email: data[0].email,
        username: data[0].username,
    } satisfies StoredUser

}

export async function getMemeberRoleById(id: string) : Promise<string[] | null> {
    try {
    const {data, error } = await supabase.from("FamilyRoles").select("*").eq("userId", id)
    if (error) {
        console.error("Error fetching family roles by ID:", error.message);
        return null;
    }
    return data

    } catch (e ) {
        console.error(e)
        return null
    }
    
}

export async function insertMemeberById(id: string, role: string, name: string) {
    try {
        const {data, error } = await supabase.from("FamilyRoles").insert({"userId": id, "role": role, "name": name})
        if (error) {
            console.error("Error inserting family roles by ID:", error.message);
            return null; 
        }
        return data
    } catch (e) {
        console.error(e)
        return null
    }

}