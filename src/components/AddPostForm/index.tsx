import {ChangeEvent, useMemo, useState} from "react";
import {useAppSelector} from "../../store/hooks.ts";
import {selectAllUsers} from "../../store/features/users/usersSlice.ts";
import {useAddNewPostMutation} from "../../store/features/api/apiSlice.ts";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const users = useAppSelector(selectAllUsers)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)
  const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => setUserId(event.target.value)

  const handleSavePostClick = async () => {

    if(canSave) {
      try {
        await addNewPost({title, content, user: userId}).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error("Failed to save the post: ", err)
      }
    }
  }

  const usersOptions = useMemo(() => {
    return users.map(user => (
     <option key={user.id} value={user.id}>
      {user.name}
    </option>)
    )
  }, [users])

  return (
   <section>
     <h2>Add a New Post</h2>
     <form>
       <label htmlFor="postTitle">Post Title:</label>
       <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={handleTitleChange}
       />
       <label htmlFor="postAuthor">Author:</label>
       <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
         <option value=""></option>
         {usersOptions}
       </select>
       <label htmlFor="postContent">Content:</label>
       <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={handleContentChange}
       />
       <button type="button" onClick={handleSavePostClick} disabled={!canSave}>Save Post</button>
     </form>
   </section>
  )
}
