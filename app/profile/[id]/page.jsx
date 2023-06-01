'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const userProfile = ({ params }) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')

    const [users, setUsers] = useState([])

    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${params?.id}/posts`)
        const data = await res.json()

        setUsers(data)
    }

    useEffect(() => {
     if(params?.id) fetchPosts()
    }, [params.id])
  return (
      <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s Profile and explore ${userName}'s imagination and brain power at work`}
        data={users}
      />
  )
}

export default userProfile