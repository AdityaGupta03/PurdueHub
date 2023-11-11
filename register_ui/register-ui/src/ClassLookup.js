import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa"
import "./styles.css"

import './Club.css'

import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function ClassLookup() {

    const sampleClasses = [
        {
            className: 'CS 25000',
            tag: ' - Computer Architecture',
            description: ' Digital logic: transistors, gates, and combinatorial circuits; clocks; registers and register banks; arithmetic-logic units; data representation: big-endian and little-endian integers; ones and twos complement arithmetic; signed and unsigned values; Von-Neumann architecture and bottleneck; instruction sets; RISC and CISC designs; instruction pipelines and stalls; rearranging code; memory and address spaces; physical and virtual memory; interleaving; page tables; memory caches; bus architecture; polling and interrupts; DMA; device programming; assembly language; optimizations; parallelism; data pipelining. Typically offered Fall Spring.',
            instructor: 'Professor X',
            creditHours: 4,
        },
        {
            className: 'CS 25200',
            tag: ' - Systems Programming',
            description: ' Low-level programming; review of addresses, pointers, memory layout, and data representation; text, data, and bss segments; debugging and hex dumps; concurrent execution with threads and processes; address spaces; file names; descriptors and file pointers; inheritance; system calls and library functions; standard I/O and string libraries; simplified socket programming; building tools to help programmers; make and make files; shell scripts and quoting; unix tools including sed, echo, test, and find; scripting languages such as awk; version control; object and executable files (.o and a.out); symbol tables; pointers to functions; hierarchical directories; and DNS hierarchy; programming embedded systems. Typically offered Fall Spring.',
            instructor: 'Professor X',
            creditHours: 4,
        },
        {
            className: 'CS 18000',
            tag: ' - Problem Solving And Object-Oriented Programming',
            description: 'Problem solving and algorithms, implementation of algorithms in a high level programming language, conditionals, the iterative approach and debugging, collections of data, searching and sorting, solving problems by decomposition, the object-oriented approach, subclasses of existing classes, handling exceptions that occur when the program is running, graphical user interfaces (GUIs), data stored in files, abstract data types, a glimpse at topics from other CS courses. Intended primarily for students majoring in computer sciences. Credit cannot be obtained for both CS 18000 and any of 15600, 15800 and 15900. Not open to students with credit in CS 24000. Typically offered Fall Spring Summer.',
            instructor: 'Professor X',
            creditHours: 4,
        },
    ]


    const [data, setData] = useState(sampleClasses);
    const [value, setValue] = useState("");
    const navigate = useNavigate();


    const onChange = async (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        navigate(`/class/${searchTerm}`);
    };

    return (
        <div className="full">
            
            <h1 className='searchTitle'>Class Lookup</h1>

            <div className="search-container">
                <div className="search-inner">
                    <FaSearch id="search-icon" />
                    <input
                        className='searchInput'
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder='Type to search...' />
                </div>
                <div className="dropdown">
                    {data.filter(item => {
                        const searchTerm = value.toLowerCase();
                        const classFound = item.className.toLowerCase();

                        return searchTerm && classFound.includes(searchTerm);
                    })
                        .map((item) => (
                            <div
                                onClick={() => onSearch(item.className)}
                                className="dropdown-row"
                                key={item.className}
                            >
                                {item.className + item.tag}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ClassLookup