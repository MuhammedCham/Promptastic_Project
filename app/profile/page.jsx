"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import Provider from '@components/Provider'


const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
          
      const fetchPost = async () => { 
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json()

        setPosts(data)
        
      }

      
      if (session?.user.id) fetchPost()
    }, [session?.user.id])
    

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p) => p._id !== post._id)

          setPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
        
    }
    
  return (
    <Provider>
    <Profile  
        name="My"
        desc="Welcome to my personalised profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    </Provider>
  )
}

export default MyProfile