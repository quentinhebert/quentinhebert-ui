import Link from "next/link"

export default function NextLink({ href, ...props }) {
  return <Link href={href} passHref scroll={false} {...props} />
}
