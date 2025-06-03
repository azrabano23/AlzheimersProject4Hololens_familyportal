import type { User } from "@supabase/supabase-js";


export type UserData = {
    user: User;
    stored: StoredUser;
    
};

export type StoredUser = {
    email: string;

    user_id: string;
    username: string;
    activeRole?: string | null
}

export type FamilyMemeber = {
    name : string,
    userId: string,
    created_at: string,
    role: string,
    id: string,
    
}