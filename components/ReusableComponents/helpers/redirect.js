import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Redirect({ target }) {
  const router = useRouter()
  useEffect(() => {
    router.push(target || "")
  }, [])

  return <div />
}
