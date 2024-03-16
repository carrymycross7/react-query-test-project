import {request,gql} from 'graphql-request'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const endpoint = 'https://graphqlzero.almansi.me/api'


function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(
          endpoint,
          gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `,
      )
      console.dir(data); // debug - remove 
      return data
    },
  })
}

function App() {
  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = usePosts()

  return (
      <div>
        <h1>Posts</h1>
        <div>
          {status === 'pending' ? (
              'Loading...'
          ) : status === 'error' ? (
              <span>Error: {error.message}</span>
          ) : (
              <>
                <div>
                  {data.map((post) => (
                      <p key={post.id}>

                      </p>
                  ))}
                </div>
                <div>{isFetching ? 'Background Updating...' : ' '}</div>
              </>
          )}
        </div>
      </div>
  )
}

export default App;