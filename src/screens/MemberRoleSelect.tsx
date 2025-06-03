import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getMembersById, insertMemeberById } from "@/data/supabaseclient"
import type { FamilyMemeber } from "@/data/types"
import { useUserStore } from "@/data/userstore"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const MemberRoleSelect = () => {
    const [members, setMembers] = useState<FamilyMemeber[] | null>()
    const userId = useUserStore((state) => state.userData?.user.id)
    const role = useUserStore((state) => state.userData?.stored.activeRole)
    const roleFunc = useUserStore((state) => state.setActiveRole)

    const navigator = useNavigate()

    console.log(role, "ROEL")

    if(role !== undefined) {
        navigator("/home")
        return
    }

    useEffect(() => {
        async function getMembers(){
            if (!userId) {
                navigator("/signin")
            } else {
                const allMemebrs = await getMembersById(userId)
                setMembers(allMemebrs)
            }

        }
        getMembers()
    }, [])

    const handleRoleSelect = (role: string) => {
        console.log("HII")
        roleFunc(role)
    }

    
    return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-black px-6 py-10">
      <h1 className="text-3xl md:text-5xl font-semibold mb-10">What Is Your Family Role</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {members?.map((role, index) => (
          <button
            key={index}
            onClick={() => handleRoleSelect(role.role)}
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-md flex items-center justify-center text-2xl md:text-3xl font-bold">
              {role.role.charAt(0).toUpperCase()}
            </div>
            <span className="mt-2 text-sm md:text-base">{role.role}</span>
          </button>
        ))}
        
        <RolePopup/>
      </div>
    </div>
  );
}


const RolePopup = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [selectedRole, setSelectedRole] = useState("Mom")

  const userId = useUserStore((s) => s.userData?.user.id)
  const setActiveRole = useUserStore((s) => s.setActiveRole)
  const navigator = useNavigate()

  const roles = ["Mom", "Dad", "Brother", "Sister", "Uncle", "Aunt", "Cousin"]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !name || !selectedRole) {
      alert("Please fill in all fields")
      return
    }

    const error = await insertMemeberById(userId, selectedRole, name)
    if(error !== null) {
        console.log(error)
        navigator("/")
    }

    if (error) {
      console.error("Error saving role:", error)
      alert("Failed to save role")
    } else {
      setActiveRole(selectedRole)
      navigator("/home")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <button
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-500 rounded-md flex items-center justify-center text-4xl font-bold">
            +
          </div>
          <span className="mt-2 text-sm md:text-base">Add Profile</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6 rounded-lg bg-card shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Enter Your Name & Role</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-input rounded-md bg-background px-3 py-2 text-foreground"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="py-2 px-4 rounded-md">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MemberRoleSelect