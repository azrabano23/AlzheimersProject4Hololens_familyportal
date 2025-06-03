import { getMemeberRoleById } from "@/data/supabaseclient"
import { useUserStore } from "@/data/userstore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const MemberRoleSelect = () => {
    const [roles, setRoles] = useState<string[] | null>()

    const userId = useUserStore((state) => state.userData?.user.id)
    const role = useUserStore((state) => state.userData?.stored.activeRole)

    const navigator = useNavigate()
    console.log(role, "ROEL")
    if(role !== null) {
        navigator("/home")
    }

    useEffect(() => {
        async function getRoles(){
            if (!userId) {
                navigator("/signin")
            } else {
                const allRoles = await getMemeberRoleById(userId)
                setRoles(allRoles)
            }

        }
        getRoles()
    }, [])

    const handleRoleSelect = (role: string) => {
        console.log("Selected role:", role)
    }

    const handleCreateRole = () => {
        console.log("Navigate to create role screen or open modal")
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl md:text-5xl font-semibold mb-10">What Is Your Family Role</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {roles?.map((role, index) => (
          <button
            key={index}
            onClick={() => handleRoleSelect(role)}
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-md flex items-center justify-center text-2xl md:text-3xl font-bold">
              {role.charAt(0).toUpperCase()}
            </div>
            <span className="mt-2 text-sm md:text-base">{role}</span>
          </button>
        ))}

        <button
          onClick={handleCreateRole}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-500 rounded-md flex items-center justify-center text-4xl font-bold">
            +
          </div>
          <span className="mt-2 text-sm md:text-base">Add Profile</span>
        </button>
      </div>
    </div>
  );
}

export default MemberRoleSelect