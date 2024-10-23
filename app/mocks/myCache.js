// import NodeCache from 'node-cache';

// const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// export default myCache;

const myCache = {
  
    "total_albumes": 7,
    "total_canciones": 25,
    "albumes": [
        "Ghost Stories",
        "A Head Full of Dreams",
        "Mylo Xyloto",
        "Kaleidoscope - EP",
        "Viva La Vida or Death and All His Friends",
        "Parachutes",
        "X&Y"
    ],
    "canciones": [
        {
            "cancion_id": 829910927,
            "nombre_album": "Ghost Stories",
            "nombre_tema": "A Sky Full of Stars",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/a2/31/4b/a2314b97-10b6-190c-72b3-45cc21bbf56b/mzaf_740612971315603868.plus.aac.p.m4a",
            "fecha_lanzamiento": "2014-05-02",
            "precio": {
                "valor": 1.29,
                "moneda": "USD"
            },
            "ranking": "0/5"
        },
        {
            "cancion_id": 829909824,
            "nombre_album": "Ghost Stories",
            "nombre_tema": "Magic",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/23/e4/d5/23e4d5ef-f001-dee1-055d-276f9088f725/mzaf_9119785706370797971.plus.aac.p.m4a",
            "fecha_lanzamiento": "2014-03-03",
            "precio": {
                "valor": 1.29,
                "moneda": "USD"
            },
            "ranking": "0/5"
        },]
}

export default myCache;