import NodeCache from 'node-cache';
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 3600 });

export const searchTracks = async (req, res) => {
  const { name, usuario } = req.query

  let tracksByUser;

  if (!name) {
    return res.status(400).json({ error: 'El parámetro de búsqueda es requerido' });
  }
  if (usuario) tracksByUser = myCache.get(usuario)
  const cachedData = myCache.get(name);

  if (cachedData && usuario && tracksByUser) {
    const updatedCache = cachedData.map(itemA => {
      const itemB = tracksByUser.find(itemB => itemB.cancion_id === itemA.cancion_id)
      return itemB ? itemB : itemA
    })
    res.json({ data: updatedCache, source: 'cache' })
  } else if (cachedData && usuario && !tracksByUser) {
    return res.json({ data: cachedData, source: 'cache' })
  } else if (cachedData && !usuario) {
    return res.json({ data: cachedData, source: 'cache' })
  } else {
    try {
      const fetchMusic = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}`)
      if (!fetchMusic.ok) throw new Error('Error al realizar la consulta')
      const data = await fetchMusic.json()

      const filterByArtistName = data.results.filter(item => item.artistName.toLowerCase() == name && item.kind.toLowerCase() == 'song')
      const shortenResults = filterByArtistName.length > 25 ? filterByArtistName.slice(0, 25) : filterByArtistName

      const mapedData = shortenResults.map(item => ({
        cancion_id: item.trackId,
        nombre_album: item.collectionName,
        nombre_tema: item.trackName,
        preview_url: item.previewUrl,
        fecha_lanzamiento: formatDate(item.releaseDate),
        precio: {
          valor: item.trackPrice,
          moneda: item.currency
        },
        ranking: '0/5'
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

      myCache.set(name, response)
      return res.json({ data: response, source: 'api' })

    } catch (error) {
      return res.status({ status: 500 }).json({ error: error.message })
    }
  }
}

export const favoritos = async (req, res) => {
  const { nombre_banda, cancion_id, usuario, ranking } = req.body
  if (!nombre_banda || !cancion_id || !usuario || !ranking) res.status(400).json({ error: 'El parámetro de búsqueda es requerido' });

  const favouriteObj = {
    nombre_banda,
    cancion_id,
    usuario,
    ranking
  }

  const cachedByUser = myCache.get(usuario);
  console.log('cachedByUser', cachedByUser)

  const tracksByBand = myCache.get(nombre_banda)

  const updatedTracks = tracksByBand.canciones.map(track => {
    if (track.cancion_id === parseInt(cancion_id)) {
      return { ...track, ranking: '5/5' }
    }
    return track
  })

  const addUpdatedTracks = { ...tracksByBand, canciones: updatedTracks }

  const updateFavs = cachedByUser ? cachedByUser.concat([favouriteObj]) : [favouriteObj]

  console.log('updateFavs', updateFavs)

  myCache.set(usuario, updateFavs)
  myCache.set(nombre_banda, addUpdatedTracks)

  return res.json({ data: 'success', source: 'api' })
}


const formatDate = date => {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}