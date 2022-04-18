import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: 'aStwN3JIV45U7Srk5BgmFpTiH2qXLvsnhsqOY8juxoE',
})

const ListItem = ({ id, title, removeItem, editItem }) => {
  const [titleImage, setTitleImage] = useState(null)
  const titleImageRes = unsplash.search.getPhotos({
    query: title,
    page: 1,
    perPage: 1,
  })

  titleImageRes.then((res) => {
    setTitleImage(res.response.results[0].urls.full)
  })

  return (
    <div>
      <article className="grocery-item" key={id}>
        <p className="title">{title}</p>

        <div className="btn-container">
          <button
            type="button"
            className="edit-btn"
            onClick={() => editItem(id)}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => removeItem(id)}
          >
            <FaTrash />
          </button>
        </div>
      </article>
      {titleImage && <img w="8rem" h="4rem" alt={title} src={titleImage} />}
    </div>
  )
}

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => (
        <ListItem
          id={item.id}
          title={item.title}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
    </div>
  )
}

export default List
