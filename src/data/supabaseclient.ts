import { createClient, type Session, type User } from '@supabase/supabase-js'
import type { FamilyMemeber, GroupMediaItem, StoredUser } from './types'


export const supabase = createClient(
    'https://ujsljeyrsxniajsqizar.supabase.co', 
    import.meta.env.VITE_SUPABASE_API_KEY
)



export async function GetSignedInUserAndRole() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data || !data.activeRole) {
    return null
  }

  return {
    user: session.user,
    stored: data,
  };
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


export async function getUserById(id: string, name: string | null): Promise<StoredUser | null> {
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
        name: name
    } satisfies StoredUser

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

export async function getMembersById(id: string) {
    try {
        const {data, error} = await supabase.from("FamilyRoles").select("*").eq("userId", id)
        if (error) {
            console.error("Error fetchign family members by group id", error)
            return null
        }
        return data as FamilyMemeber[]
    } catch (e) {
        console.error(e)
        return null
    }

}

export async function uploadMedia(file: File, folder: string) {
    const filePath = `${folder}/${Date.now()}_${file.name}`

    const { error } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        })

    if (error) {
        console.error("Upload error:", error.message)
        return null
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath)
    return urlData.publicUrl
}

export async function getAllGroupMediaWithNames(groupId: string): Promise<GroupMediaItem[]> {
  const result: GroupMediaItem[] = []

  const { data: folders, error: folderErr } = await supabase
    .storage
    .from("media")
    .list(`user-uploads/${groupId}`)

  if (folderErr || !folders) {
    console.error("Error listing group folders:", folderErr)
    return []
  }

  for (const folder of folders) {
    const personName = folder.name
    if (!personName) continue

    const path = `user-uploads/${groupId}/${personName}`
    const { data: files, error: fileErr } = await supabase
      .storage
      .from("media")
      .list(path)

    if (fileErr || !files) {
      console.warn(`No media for ${personName}`)
      continue
    }

    for (const file of files) {
      const fullPath = `${path}/${file.name}`
      const publicUrl = supabase.storage.from("media").getPublicUrl(fullPath).data.publicUrl
      result.push({ url: publicUrl, uploader: personName })
    }
  }

  return result
}

