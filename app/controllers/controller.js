export const searchTracks = async (req, res) => {
  const { name } = req.query

  if (!name) res.status(400).json({ error: 'El parámetro de búsqueda es requerido' });

  try {
    const fetchMusic = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}`)
    if (!fetchMusic.ok) throw new Error('Error al realizar la consulta')
    const data = await fetchMusic.json()

    const filterByArtistName = data.results.filter(item => item.artistName.toLowerCase() == name && item.kind.toLowerCase() == 'song')
    const shortenResults = filterByArtistName.length > 25 ? filterByArtistName.slice(0,25) : filterByArtistName

    const mapedData = shortenResults.map(item => ({
      cancion_id: item.trackId,
      nombre_album: item.collectionName,
      nombre_tema: item.trackName,
      preview_url: item.previewUrl,
      fecha_lanzamiento: formatDate(item.releaseDate),
      precio: {
        valor: item.trackPrice,
        moneda: item.currency
      }
    }))

    const collecions = new Set(shortenResults.map(item => item.collectionName))
    // nombre del album --> collectionName
    const total_albumes = collecions.size
    const albumes = Array.from(collecions);

    const response = {
      total_albumes: total_albumes,
      total_canciones: shortenResults.length,
      albumes: albumes,
      canciones: mapedData
    }

    return res.json({ response })

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

  /* // Objeto en memoria para almacenar los datos temporalmente
  let memoryStorage = {};
  
  // Ruta para guardar datos en memoria
  app.post('/save', (req, res) => {
    const { key, value } = req.body;
    memoryStorage[key] = value;
    res.send(`Dato guardado: ${key} = ${value}`);
  });
  
  // Ruta para recuperar datos de la memoria
  app.get('/retrieve/:key', (req, res) => {
    const { key } = req.params;
    const value = memoryStorage[key];
    if (value) {
      res.send(`Dato recuperado: ${key} = ${value}`);
    } else {
      res.send(`Dato no encontrado para la clave: ${key}`);
    }
  }); */




}

export const updateBlog = async (req, res) => {

}




const formatDate = date => {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);
  
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}