import { useQuery, useQueryClient } from '@tanstack/react-query'
import { app } from 'electron';
import { Link } from 'react-router-dom'

export function Home(){
  const queryClient = useQueryClient();

  //Buscar os clientes
  const { data, isFetching } = useQuery({ queryKey: ['costumers'], queryFn: async () => {
    const response = await window.api.fetchAllCostumers();
    //console.log(response);
    return response;
  } })

  return (
    <div className='flex-1 flex flex-col py-12 text-white'>
      <div className='px-10'>
          <h1 className='text-white text-xl lg:text-3xl font-semibold mb-4'>
            Todos clientes
          </h1>
      </div>

      <section className='flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]'>
        {!isFetching && data?.length === 0  && (
          <p className='text-gray-300'>Nenhum cliente cadastrado...</p>
        )}
        {data?.map((costumer) => (
          <Link 
            to={`/costumer/${costumer._id}`} 
            key={costumer._id}
            className='bg-gray-800 px-4 py-3 rounded'
          >
            <p className='mb-2 font-semibold text-lg'>{costumer.name}</p>
            <p><span className='font-semibold'>Email: </span>{costumer.email}</p>
            {costumer.phone && (
              <p>
                <span className='font-semibold'>Telefone: </span> {costumer.phone}
              </p>
            )}
          </Link>
        ))}
      </section>

    </div>
  )
}