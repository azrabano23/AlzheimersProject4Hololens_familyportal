import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { SignOut, uploadMedia } from "@/data/supabaseclient"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { useUserStore } from "@/data/userstore"

const Navbar = () => {
    const navigator = useNavigate()

  return (
    <nav>
        <div className="w-screen flex justify-center items-center space-x-4">
            <Button asChild variant="ghost">
                <Link to="/home">Home</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link to="/members">Members</Link>
            </Button>
            <Button asChild variant="ghost">
                <UploadPopup/>
            </Button>
            <Button onClick={async () => {
                await SignOut()
                navigator("/")
                }} asChild variant="ghost">
                <p>Signout</p>
            </Button>
        </div>
    </nav>
  )
}

const UploadPopup = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const userId = useUserStore((s) => s.userData?.user.id)

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !userId) {
      alert("make sure to selct a file and be logged in")
      return
    }

    const publicUrl = await uploadMedia(file, `user-uploads/${userId}`)
    if (publicUrl) {
      console.log("uploaded file:", publicUrl)
      alert("upload successful")
      setOpen(false)
    } else {
      alert("upload failed")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Upload Media</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6 rounded-xl bg-card shadow-xl border border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-foreground">
            Upload a Photo or Video
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="mt-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Select File
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-primary file:text-white
                         hover:file:bg-primary/90"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-6">
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Navbar