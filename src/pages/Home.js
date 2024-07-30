import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

const Home = () => {
    const [data, setdata] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [genders, setGenders] = useState(['male', 'female']);
    const [selectedCountry, setselectedCountry] = useState('');
    const [selectedGender, setselectedGender] = useState('');
    const limit = 30;
    const skip = 0;

    useEffect(() => {
        axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            .then(fetcheddata =>{
                setdata(fetcheddata.data.users)
                setfilterData(fetcheddata.data.users)
                const uniqueCountries = [...new Set(fetcheddata.data.users.map(user => user.address.country))]
                setCountries(uniqueCountries)
            })
    }, [limit,skip])

    useEffect(() => {
        const filtered = data.filter(user =>
            (selectedCountry ? user.address.country === selectedCountry : true) &&
            (selectedGender ? user.gender === selectedGender : true)
        )
        setfilterData(filtered);
    }, [selectedCountry, selectedGender, data]);

    return (
        <div className='mt-8'>
            <div className='flex items-center justify-between mr-5 ml-5 mb-8 mt-8'>
                <h1 className='text-3xl font-bold mb-4 mt-4'>
                    Employees
                </h1>
                <div className='flex items-center space-x-8 mr-10'>
                    <FaFilter className='text-red-700'/>
                    <select value={selectedCountry} onChange={e => setselectedCountry(e.target.value)} className='py-1 px-1 border rounded-md'>
                        <option value="">Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <select value={selectedGender} onChange={e => setselectedGender(e.target.value)} className='py-1 px-5 border rounded-md'>
                        <option value="">Gender</option>
                        {genders.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='overflow-x-auto mx-8'>
                <table className='min-w-full border-collapse border border-gray-300 rounded-lg'>
                    <thead>
                        <tr className='text-left'>
                            <th className='py-3 px-4 flex items-center'>ID<HiOutlineArrowsUpDown className='ml-2' /></th>
                            <th className='py-3 px-4'>Image</th>
                            <th className='py-3 px-4 flex items-center'>Full Name<HiOutlineArrowsUpDown className='ml-2' /></th>
                            <th className='py-3 px-4'>Demography</th>
                            <th className='py-3 px-4'>Designation</th>
                            <th className='py-3 px-4'>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map(e => (
                            <tr key={e.id} className='border border-gray-300'>
                                <td className='py-3 px-4 text-gray-600'>{e.id}</td>
                                <td className='py-3 px-4 text-gray-600'><img src={e.image} className='w-8 h-8' /></td>
                                <td className='py-3 px-4 text-gray-600'>{e.firstName} {e.maidenName} {e.lastName}</td>
                                <td className='py-3 px-4 text-gray-600'>{e.gender === 'female' ? 'F' : 'M'}/{e.age}</td>
                                <td className='py-3 px-4 text-gray-600'>{e.company.title}</td>
                                <td className='py-3 px-4 text-gray-600'>{e.address.state},{e.address.country === 'United States' ? ' USA' : e.address.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home