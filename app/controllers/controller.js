export const searchTracks = async (req, res) => {
  const { name } = req.query

  if (!name) res.status(400).json({ error: 'El parámetro de búsqueda es requerido' });
  
  try {
    const fetchMusic = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}`)
    if (!fetchMusic.ok) throw new Error('Error al realizar la consulta')
    const data = await fetchMusic.json()
    return res.json({ data })

  } catch (error) {
    return res.json({ error: error.message }, { status: 500 })
  }
}

export const searchTrackById = async (req, res) => {
  // const { id } = req.params
  // try {
  //   const data = await connection.query(`SELECT * FROM blog WHERE id = ? `, [id])
  //   console.log(data)
  //   if (data.length <= 0) return res.status(404).json({ message: 'Blog no encontrado' })
  //   return res.json(data[0])
  // } catch (error) {
  //   return res.json(
  //     {
  //       message: error.message
  //     }
  //   )
  // }
}

export const favoritos = async (req, res) => {
  // const { title, author_name, tags, category, subcategory, status_blog, content, image } = req.body
  // const rows = await connection.query('INSERT INTO blog (title, author_name, tags, category, subcategory, status_blog, content, image) VALUES (?,?,?,?,?,?,?,?) ', [title, author_name, tags, category, subcategory, status_blog, content, image])
  // console.log('TAGS', tags)
  // const values = JSON.stringify(tags)
  // res.json({
  //   id: rows.insertId, title, author_name, tags: values, category, subcategory, status_blog, content, image
  // })
}

export const updateBlog = async (req, res) => {
  // const { id } = req.params
  // const { title, author_name, tags, category, subcategory, status_blog, content, image } = req.body

  // const [selectedBlog] = await connection.query('SELECT * FROM blog WHERE id = ? ', [id])
  // console.log('selectedBlog', selectedBlog);

  // try {
  //   const data = await connection.query('UPDATE blog SET title = ?, author_name = ?, tags = ?, category = ?, subcategory = ?, status_blog = ?, content = ?, image = ? WHERE id = ?', [
  //     title || selectedBlog.title, 
  //     author_name || selectedBlog.author_name, 
  //     tags || selectedBlog.tags, 
  //     category|| selectedBlog.category, 
  //     subcategory|| selectedBlog.subcategory, 
  //     status_blog|| selectedBlog.status_blog, 
  //     content|| selectedBlog.content, 
  //     image|| selectedBlog.image, 
  //     id
  //   ])

  //   if (data.length <= 0) return res.status(404).json({ message: 'Blog no encontrado' })
  //   return res.json(data[0])
  // } catch (error) {
  //   return res.json(
  //     {
  //       message: error.message
  //     }
  //   )
  // }
}
