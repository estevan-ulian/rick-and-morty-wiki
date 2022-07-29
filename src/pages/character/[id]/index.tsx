import Image from "next/image";

const publicEndpoint = 'https://rickandmortyapi.com/api/character';

export default function Character({ data }) {
  console.log(data)
  return (
    <>
      <div className="flex flex-wrap gap-2 w-full mx-auto">        
        
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(publicEndpoint);
  const data = await res.json();
  const paths = data.results.map(value => ({
    params: { id: value.id.toString() }
  }));
  console.log(paths)
  return {
    paths, 
    fallback: false
  }
}

export async function getStaticProps({ params }) {  
  const { id } = params.id;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  return {
    props: { data }
  }
}
