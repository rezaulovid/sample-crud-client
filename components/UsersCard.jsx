"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import UpdateUserDialog from "./UpdateUserDialog"
// import { useRouter } from "next/router"

const UsersCard = ({ user }) => {
  const { _id } = user
  const router = useRouter()

  const handleDeleteUser = async (id) => {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })

    const afterDelete = await res.json()
    console.log("after delete", afterDelete)
    if (afterDelete.deletedCount > 0) {
      console.log("User delete successfully")
      //    router.refresh();
      router.refresh()
    }
  }

  return (
    <div>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <CardHeader>
          <CardAction>
            <h2>No Action</h2>
          </CardAction>

          <CardTitle>{user.name}</CardTitle>

          <CardDescription>{user.email}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Link href={`/users/${user._id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
          <UpdateUserDialog user={user}></UpdateUserDialog>
          <Button onClick={() => handleDeleteUser(_id)} variant="destructive">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UsersCard
