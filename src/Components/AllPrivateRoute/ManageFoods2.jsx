import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../SecretLayouts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Helmet } from 'react-helmet-async';




const ManageFoods2 = () => {
    const { user } = useContext(AuthContext)
    // const [foods , setFoods] = useState([])
    const url = `https://food-share-server.vercel.app/managefood?email=${user.email}`

    const { data:foods, isPending,isLoading, refetch } = useQuery({
        queryKey: ['foods'],
        queryFn: async() => {
            const res = await fetch(url)
            return res.json()
        }
    })
    console.log('column er upre', foods)
    const columns = [
        {
            accessorKey: 'foodname',
            header: 'Foood Name',
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity Of Food',
    
        },
        {
            accessorKey: 'date',
            header: 'Expire Date(yy-mm-dd)',
    
        },
        {
            accessorKey: 'location',
            header: 'Location',
    
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell:()=>(
                <div >
                    <button>edit</button>
                    <button>edit</button>
                </div>
            )
    
        },
    
    ]

    // useEffect(()=>{
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data=> setFoods(data))
    // },[])

    // const foods = data?.data;
    console.log(foods)
    const data = useMemo(() => foods, [])

    //react table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    console.log(table.getHeaderGroups())
    if(isLoading){
        return <div>Loading</div>
    }
    if(isPending){
        return <div>Loading</div>
    }


    return (
        <div className="overflow-x-auto max-w-5xl mx-auto my-12 border-2 rounded-xl">
            <Helmet><title>Manage Food</title></Helmet>
            {
                foods.length >0 &&<table className="table table-xs">
                <thead>
                    {
                        table?.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>{
                                headerGroup.headers?.map(header => (
                                    <th key={header.id}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header, header.getContext()
                                            )
                                        }
                                    </th>
                                ))
                            }</tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table?.getRowModel()?.rows?.map(row =>(
                            <tr key={row.id}>
                                {
                                    row?.getVisibleCells()?.map(cell =>(
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column?.columnDef?.cell , cell?.getContext()
                                            )}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
            }
        </div>
    );
};

export default ManageFoods2;