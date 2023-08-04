import { useRouter } from "next/router"
import { useEffect } from "react"
import apiCall from "../../services/apiCalls/apiCall"

export default function RedirectionPage({}) {
  const router = useRouter()

  const getOriginalUrlAndRedirect = async ({ id }) => {
    const res = await apiCall.application.redirections.getOrinialUrl({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      window.location.href = jsonRes.originalUrl
    }
  }

  useEffect(() => {
    if (!!router.query.id) getOriginalUrlAndRedirect({ id: router.query.id })
  }, [router.query])
  return <></>
}
