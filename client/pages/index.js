import axios from "axios"
const Landing = (props) => {
  console.log(props, 'props');
  return <h1>Landing</h1>
}

Landing.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const url = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser'
    const { data } = await axios.get(url, {
      headers: req.headers
    })

    return data
  } else {
    const { data } = axios.get('/api/users/currentuser')

    return data
  }
}

export default Landing
