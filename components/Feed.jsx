'use client'

import { useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>)
}
 
const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResult, setSearchResult] = useState([])
  const [post, setPost] = useState([])

  
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setPost(data)
    }

    fetchPost()
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i')
    return post.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) || 
      regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchResult(searchResult)
  }

  
  return (
    <section className='feed'>
      <form action="" className="relative w-full flex-center">
       <input 
          type="text"
          placeholder='search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer' 
        />
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchResult}
          handleTagClick={handleTagClick}
       />
      ) : (
        <PromptCardList 
          data={post}
          handleTagClick={handleTagClick}
       />
       )}
    </section>
  )
}

export default Feed