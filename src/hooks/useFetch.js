// import { useEffect, useState } from 'react'
// import axios from '../services/axiosConfig'

// export default function useFetch(url) {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(Boolean(url))
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (!url) return
//     let mounted = true; setLoading(true)
//     axios.get(url)
//       .then(res => mounted && setData(res.data))
//       .catch(err => mounted && setError(err))
//       .finally(() => mounted && setLoading(false))
//     return () => { mounted = false }
//   }, [url])

//   return { data, loading, error }
// }
