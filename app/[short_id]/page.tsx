

const Page = ({params} : any) => {
  const id = params.short_id
  return <p>Post: {id}</p>
}

export default Page