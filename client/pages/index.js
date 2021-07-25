import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return currentUser ? <h1>You're signed in</h1> : <h1>You are NOT signed in</h1>
}

Landing.getInitialProps = async ({ req }) => {
  const api = buildClient({ req })
  const { data } = await api.get('/api/users/currentuser')

  return data
}

export default Landing
